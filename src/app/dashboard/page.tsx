import { headers } from "next/headers";
import { BentoGrid } from "@/components/dashboard/bento-grid";
import { auth, prisma } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  const entriesCount = await prisma.post.count({
    where: { authorId: session?.user.id, isDraft: false },
  });
  const draftsCount = await prisma.post.count({
    where: { authorId: session?.user.id, isDraft: true },
  });

  const fetchedPosts = await prisma.post.findMany({
    where: { authorId: session?.user.id, isDraft: false },
    orderBy: { createdAt: "desc" },
    include: {
      tags: { include: { tag: true } },
    },
    take: 6,
  });

  const posts = fetchedPosts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    snippet: p.content.substring(0, 150) + "...",
    date: p.createdAt
      .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      .toUpperCase(),
    readTime: Math.ceil(p.content.split(/\s+/).length / 200) + " MIN READ",
    status:
      p.visibility === "PRIVATE" ? "PRIVATE" : p.visibility === "PUBLIC" ? "PUBLIC" : "LINK-ONLY",
    category: p.tags[0]?.tag.name || "THOUGHT",
    tags: p.tags.map((t) => t.tag.name),
    featured: false,
    coverColor: "bg-muted",
  }));
  return (
    <div className="min-h-full flex flex-col">
      {/* Content Canvas */}
      <div className="flex-1 p-10 lg:px-14 pb-20">
        {/* Hero Section */}
        <div className="flex items-start justify-between mb-16">
          <div className="max-w-xl">
            {/* The PRD specifies display fonts to break the rhythm. We use font-heading here. */}
            <h1 className="text-6xl font-heading font-extrabold tracking-tighter text-foreground mb-6">
              Dashboard
            </h1>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              Welcome to your sanctuary. Here lies the collective weight of your thoughts, organized
              for quiet reflection and curated growth.
            </p>
          </div>

          {/* Stats Chips */}
          <div className="flex gap-6 mt-4">
            <div className="flex flex-col items-center justify-center size-24 rounded-full bg-card shadow-sm ring-1 ring-border/10">
              <span className="text-3xl font-heading font-bold text-secondary">{entriesCount}</span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mt-1">
                Entries
              </span>
            </div>
            <div className="flex flex-col items-center justify-center size-24 rounded-full bg-card shadow-sm ring-1 ring-border/10">
              <span className="text-3xl font-heading font-bold text-amber-600/80">
                {draftsCount}
              </span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mt-1">
                Drafts
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Post Grid */}
        <BentoGrid posts={posts} />

        {/* Minimal Footer Inside Dashboard */}
        <div className="mt-24 pt-10 border-t border-border/10 flex flex-col items-center justify-center opacity-60">
          <span className="font-heading font-bold text-lg text-foreground mb-4">Kiroku</span>
          <div className="flex gap-6 uppercase text-[10px] font-sans tracking-widest font-bold text-muted-foreground mb-6">
            <span className="cursor-pointer hover:text-foreground transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Terms</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">About</span>
          </div>
          <span className="text-[10px] font-sans text-muted-foreground/60 tracking-wider">
            &copy; 2024 KIROKU. THE EDITORIAL SANCTUARY.
          </span>
        </div>
      </div>
    </div>
  );
}
