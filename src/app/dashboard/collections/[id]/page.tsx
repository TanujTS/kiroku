import { IconFolder as Folder, IconArrowRight as MoveRight } from "@tabler/icons-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { auth, prisma } from "@/lib/auth";

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
    <div className="min-h-full flex flex-col">
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
              const formattedDate = post.createdAt
                .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                .toUpperCase();
              const words = post.content.split(/\s+/).length;
              const readTime = Math.ceil(words / 200) + " MIN READ";

              return (
                <div
                  key={post.id}
                  className="group relative flex flex-col md:flex-row md:items-start justify-between gap-8 py-4 border-b border-border/5 last:border-0 hover:bg-muted/10 transition-colors -mx-6 px-6 rounded-2xl cursor-pointer"
                >
                  <div className="flex-1 max-w-2xl">
                    <div className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">
                      <span>{formattedDate}</span>
                      <span>•</span>
                      <span>{readTime}</span>
                    </div>

                    <h3 className="text-3xl font-heading font-bold tracking-tight text-foreground mb-4">
                      {post.title}
                    </h3>

                    {/* For some posts, we show a snippet */}
                    {post.content.length > 200 && (
                      <div className="mb-6">
                        <p className="text-sm font-sans text-muted-foreground leading-relaxed line-clamp-3">
                          {post.content.substring(0, 300)}...
                        </p>
                        <span className="text-xs font-sans font-bold text-primary inline-flex items-center gap-1 mt-3">
                          Read Full Entry <MoveRight className="size-3" />
                        </span>
                      </div>
                    )}

                    {/* Empty state if no tags but keep spacing */}
                    {!post.content.length && <div className="h-6" />}
                  </div>

                  <div className="flex flex-col md:items-end justify-between gap-6 md:h-full shrink-0">
                    <div className="flex gap-2 flex-wrap justify-end">
                      {post.tags.map((t) => (
                        <Badge
                          key={t.tag.id}
                          variant="secondary"
                          className="bg-muted/50 font-sans text-[10px] uppercase tracking-widest text-muted-foreground hover:bg-muted font-bold rounded-full px-3"
                        >
                          {t.tag.name}
                        </Badge>
                      ))}
                    </div>

                    <div className="hidden md:flex size-10 rounded-full border border-border/30 items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:border-foreground/20 transition-all mt-auto">
                      <MoveRight className="size-4" />
                    </div>
                  </div>

                  <Link href={`/read/${post.slug}`} className="absolute inset-0 z-10">
                    <span className="sr-only">View entry</span>
                  </Link>
                </div>
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
