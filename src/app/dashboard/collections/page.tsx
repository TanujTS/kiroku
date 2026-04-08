import { IconPlus as Plus } from "@tabler/icons-react";
import { headers } from "next/headers";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { auth, prisma } from "@/lib/auth";

export default async function CollectionsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return null;
  }

  const collections = await prisma.collection.findMany({
    where: { authorId: session.user.id },
    orderBy: { createdAt: "asc" },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  return (
    <div className="min-h-full flex flex-col">
      <div className="flex-1 p-10 lg:px-14 pb-20 pt-16">
        <div className="max-w-2xl mb-16">
          <h1 className="text-5xl font-heading font-extrabold tracking-tighter text-foreground mb-6">
            Collections
          </h1>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed">
            Curated spaces for your recurring themes. Organize your journey through thematic lenses
            and quiet reflections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {collections.map((collection, idx) => {
            const isFeatured = idx === 0; // Just styling the first one differently for aesthetic variety

            return (
              <Link
                key={collection.id}
                href={`/dashboard/collections/${collection.id}`}
                className={isFeatured ? "md:col-span-2" : ""}
              >
                <Card
                  className={`group relative overflow-hidden rounded-3xl border-0 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-end p-8 min-h-[320px] ${isFeatured ? "bg-secondary" : "bg-card"}`}
                >
                  {collection.coverImage ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center z-0 opacity-40 group-hover:opacity-50 transition-opacity"
                      style={{ backgroundImage: `url(${collection.coverImage})` }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 z-0" />
                  )}

                  <div className="relative z-10 flex flex-col justify-end h-full">
                    {/* Tiny decorative dot if featured */}
                    {isFeatured && (
                      <div className="flex items-center gap-2 mb-4 text-[10px] font-sans font-bold uppercase tracking-widest text-[#92A9E1]">
                        <span className="size-1.5 rounded-full bg-[#92A9E1]" />
                        Ongoing Series
                      </div>
                    )}

                    <h2
                      className={`text-3xl font-heading font-bold tracking-tight mb-2 ${isFeatured ? "text-white" : "text-foreground"}`}
                    >
                      {collection.title}
                    </h2>

                    {collection.description && (
                      <p
                        className={`text-sm font-sans leading-relaxed mb-6 ${isFeatured ? "text-white/70" : "text-muted-foreground"} max-w-sm`}
                      >
                        {collection.description}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between">
                      <span
                        className={`text-xs font-sans font-bold uppercase tracking-widest ${isFeatured ? "text-[#92A9E1]" : "text-secondary"}`}
                      >
                        {collection._count.posts} Entries
                      </span>

                      {isFeatured && (
                        <div className="flex items-center justify-center size-10 rounded-full bg-white/10 text-white backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                          <span className="text-sm font-sans font-bold">
                            {collection._count.posts}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Create New Collection Card */}
        <Card className="rounded-3xl border border-dashed border-border/80 bg-transparent shadow-none p-12 flex flex-col items-center justify-center text-center hover:bg-muted/30 transition-colors cursor-pointer group">
          <div className="size-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Plus className="size-5 font-bold" />
          </div>
          <h4 className="text-xl font-heading font-bold text-foreground mb-2">
            Create New Collection
          </h4>
          <p className="text-sm font-sans text-muted-foreground leading-relaxed">
            Start a new thematic journey today.
          </p>
        </Card>
      </div>
    </div>
  );
}
