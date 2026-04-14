"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { Visibility } from "@/generated/prisma/client";
import { auth, prisma } from "@/lib/auth";

export async function createPostAction(data: {
  title: string;
  content: string;
  visibility: "private" | "unlisted" | "public";
  tags?: string[];
  collectionId?: string;
}) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    if (!data.title || !data.content) {
      return { success: false, error: "Title and content are required." };
    }

    const visibilityMap: Record<string, Visibility> = {
      private: Visibility.PRIVATE,
      unlisted: Visibility.LINK_ONLY,
      public: Visibility.PUBLIC,
    };

    const slug =
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      Math.random().toString(36).slice(2, 6);

    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug,
        content: data.content,
        visibility: visibilityMap[data.visibility] || Visibility.PRIVATE,
        isDraft: false,
        authorId: session.user.id,
        publishedAt: new Date(),
        tags: data.tags?.length
          ? {
              create: data.tags.map((tag) => ({
                tag: {
                  connectOrCreate: {
                    where: { name: tag },
                    create: {
                      name: tag,
                      slug: tag
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)+/g, ""),
                    },
                  },
                },
              })),
            }
          : undefined,
        collections: data.collectionId
          ? {
              create: {
                collectionId: data.collectionId,
              },
            }
          : undefined,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, post };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to create post." };
  }
}

export async function deletePostAction(postId: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) {
      return { success: false, error: "Post not found" };
    }

    if (post.authorId !== session.user.id) {
      return { success: false, error: "Forbidden: You do not own this post" };
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/drafts");

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to delete post." };
  }
}
