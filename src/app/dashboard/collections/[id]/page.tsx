import { IconFolder as Folder } from "@tabler/icons-react";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { PostListItem } from "@/components/dashboard/post-list-item";
import { Button } from "@/components/ui/button";
import { auth, prisma } from "@/lib/auth";
import { getRelativeTimeString } from "@/lib/utils";

export default async function CollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const collectionId = resolvedParams.id;

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return null;
  }

  const collection = await prisma.collection.findFirst({
    where: {
      id: collectionId,
      authorId: session.user.id,
    },
    include: {
      _count: {
        select: { posts: true },
      },
      posts: {
        orderBy: { addedAt: "desc" },
        include: {
          post: {
            include: {
              tags: {
                include: { tag: true },
              },
            },
          },
        },
      },
    },
  });

  if (!collection) {
    notFound();
  }

  return (
    <div className="min-h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex-1 p-10 lg:px-14 pb-32 pt-16 max-w-4xl">
        {/* Collection Header */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <Folder className="size-4 text-primary" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary">
              Active Collection
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-6">
            <h1 className="text-6xl font-heading font-extrabold tracking-tighter text-foreground leading-none">
              {collection.title}
            </h1>

            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center justify-center size-12 rounded-full bg-muted/50 text-foreground ring-1 ring-border/20">
                <span className="text-lg font-heading font-bold">{collection._count.posts}</span>
              </div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground w-20 leading-tight">
                Entries Recorded
              </span>
            </div>
          </div>

          {collection.description && (
            <p className="text-xl text-muted-foreground font-sans leading-relaxed max-w-2xl">
              {collection.description}
            </p>
          )}
        </div>

        {/* Entries List */}
        <div className="flex flex-col gap-12">
          {collection.posts.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border/80 rounded-3xl">
              <p className="text-muted-foreground font-sans">No entries in this collection yet.</p>
            </div>
          ) : (
            collection.posts.map(({ post }) => {
              const rtf = getRelativeTimeString(post.createdAt);
              const readTime =
                Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200)) +
                " min read estimated";

              return (
                <PostListItem
                  key={post.id}
                  post={{
                    id: post.id,
                    title: post.title || "Untitled",
                    category: post.tags[0]?.tag.name,
                    date: `Published ${rtf}`,
                    readTime,
                  }}
                  href={`/read/${post.slug}`}
                  actionLabel="Read Entry"
                />
              );
            })
          )}
        </div>

        {collection.posts.length > 10 && (
          <div className="mt-16 text-center">
            <Button
              variant="outline"
              className="rounded-full shadow-none font-sans font-bold text-xs tracking-widest uppercase border-border/40 hover:bg-muted text-muted-foreground h-12 px-8"
            >
              Load More From Archives
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
