"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth, prisma } from "@/lib/auth";

export async function getUserCollectionsAction() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    const collections = await prisma.collection.findMany({
      where: { authorId: session.user.id },
      orderBy: { createdAt: "asc" },
      select: { id: true, title: true, description: true },
    });

    return { success: true, collections };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to fetch collections." };
  }
}

export async function createCollectionAction(data: { title: string; description?: string }) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    if (!data.title) {
      return { success: false, error: "Title is required." };
    }

    const collection = await prisma.collection.create({
      data: {
        title: data.title,
        description: data.description,
        authorId: session.user.id,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/new");
    return { success: true, collection };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to create collection." };
  }
}
