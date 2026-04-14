import { headers } from "next/headers";
import { DashboardToolbar } from "@/components/dashboard/dashboard-toolbar";
import { PostListItem } from "@/components/dashboard/post-list-item";
import { Prisma } from "@/generated/prisma/client";
import { auth, prisma } from "@/lib/auth";
import { stripHtmlTags } from "@/lib/strip-html";
import { getRelativeTimeString } from "@/lib/utils";

interface DashboardPageProps {
  searchParams: Promise<{ q?: string; tag?: string }>;
}

export default async function DashboardPage(props: DashboardPageProps) {
  const searchParams = await props.searchParams;
  const { q, tag } = searchParams;
  const session = await auth.api.getSession({ headers: await headers() });

  const entriesCount = await prisma.post.count({
    where: { authorId: session?.user.id, isDraft: false },
  });
  const draftsCount = await prisma.post.count({
    where: { authorId: session?.user.id, isDraft: true },
  });

  const whereClause: Prisma.PostWhereInput = {
    authorId: session?.user.id,
    isDraft: false,
  };

  if (q) {
    whereClause.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { content: { contains: q, mode: "insensitive" } },
    ];
  }

  if (tag) {
    whereClause.tags = {
      some: { tag: { name: tag } },
    };
  }

  const [fetchedPosts, uniqueTagsQuery] = await Promise.all([
    prisma.post.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        tags: { include: { tag: true } },
      },
      take: 20,
    }),
    prisma.tag.findMany({
      where: {
        postTags: { some: { post: { authorId: session?.user.id, isDraft: false } } },
      },
      select: { name: true },
    }),
  ]);

  const availableTags = uniqueTagsQuery.map((t) => t.name);

  const posts = fetchedPosts.map((p) => {
    const plainText = stripHtmlTags(p.content);
    return {
      id: p.id,
      slug: p.slug,
      title: p.title || "Untitled Post",
      date: `Published ${getRelativeTimeString(p.createdAt)}`,
      readTime: Math.max(1, Math.ceil(plainText.split(/\s+/).length / 200)) + " min read",
      category: p.tags[0]?.tag.name,
    };
  });

  return (
    <div className="min-h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Content Canvas */}
      <div className="flex-1 p-10 lg:px-14 pb-20">
        {/* Hero Section */}
        <div className="flex items-start justify-between mb-16 max-w-4xl">
          <div className="max-w-xl">
            <h1 className="text-6xl font-heading font-extrabold tracking-tighter text-foreground mb-6">
              Dashboard
            </h1>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              Welcome to your dashboard. Here are your latest posts, organized for easy management
              and curated growth.
            </p>
          </div>

          {/* Stats Chips */}
          <div className="flex gap-6 mt-4 hidden md:flex">
            <div className="flex flex-col items-center justify-center size-24 rounded-full bg-card shadow-sm ring-1 ring-border/10">
              <span className="text-3xl font-heading font-bold text-secondary">{entriesCount}</span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mt-1">
                Posts
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

        {/* Dashboard Toolbar for Search and Tags */}
        <DashboardToolbar availableTags={availableTags} />

        {/* Dashboard Post List */}
        <div className="max-w-4xl flex flex-col gap-6">
          {posts.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border/80 rounded-3xl">
              <p className="text-muted-foreground font-sans">
                {q || tag
                  ? "No posts found matching your current filters."
                  : "No posts found. Start writing!"}
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <PostListItem
                key={post.id}
                post={post}
                href={`/read/${post.slug || post.id}`}
                actionLabel="Read Post"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
