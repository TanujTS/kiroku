import { headers } from "next/headers";
import { PostListItem } from "@/components/dashboard/post-list-item";
import { auth, prisma } from "@/lib/auth";
import { getRelativeTimeString } from "@/lib/utils";

export default async function DraftsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return null;
  }

  const fetchedDrafts = await prisma.post.findMany({
    where: { authorId: session.user.id, isDraft: true },
    orderBy: { updatedAt: "desc" },
    include: {
      tags: { include: { tag: true } },
    },
  });

  const drafts = fetchedDrafts.map((p) => {
    const rtf = getRelativeTimeString(p.updatedAt);
    return {
      id: p.id,
      slug: p.slug || p.id,
      title: p.title || "Untitled Draft",
      date: `Edited ${rtf}`,
      readTime: Math.max(1, Math.ceil(p.content.split(/\s+/).length / 200)) + " min read estimated",
      category: p.tags[0]?.tag.name,
    };
  });

  return (
    <div className="min-h-full flex flex-col">
      <div className="flex-1 p-10 lg:px-14 pb-20 pt-16 max-w-4xl">
        <div className="mb-16">
          <h1 className="text-6xl font-heading font-extrabold tracking-tighter text-foreground mb-6">
            Drafts
          </h1>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed">
            Your unfinished thoughts and evolving stories. A quiet space to curate and polish your
            reflections before they meet the world.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {drafts.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border/80 rounded-3xl">
              <p className="text-muted-foreground font-sans">No drafts found.</p>
            </div>
          ) : (
            drafts.map((draft) => (
              <PostListItem
                key={draft.id}
                post={draft}
                href={`/dashboard/new?id=${draft.id}`} // assuming this is how drafts are edited, or something similar
                actionLabel="Continue Writing"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
