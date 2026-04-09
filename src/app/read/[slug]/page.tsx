import {
  IconBookmark as Bookmark,
  IconArrowLeft as MoveLeft,
  IconSend as Send,
} from "@tabler/icons-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth, prisma } from "@/lib/auth";

export default async function ReadPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const session = await auth.api.getSession({ headers: await headers() });

  const post = await prisma.post.findUnique({
    where: { slug: slug },
    include: {
      author: true,
      tags: {
        include: { tag: true },
      },
    },
  });

  if (!post) {
    notFound();
  }

  // Authorization check
  if (post.visibility === "PRIVATE") {
    if (!session || session.user.id !== post.authorId) {
      notFound(); // Hide private posts completely
    }
  }

  const formattedDate = post.createdAt.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Format content logic: handle \n\n as paragraphs
  const paragraphs = post.content.split(/\n\n+/).filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Banner (Distraction-Free) */}
      <div className="py-6 px-10 flex items-center justify-between border-b border-border/10 sticky top-0 bg-background/95 backdrop-blur-md z-50">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
        >
          <MoveLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          Exit Reader
        </Link>
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground/60 hidden md:block">
          Kiroku Distraction-Free Mode
        </span>
        <div className="flex items-center gap-6 text-muted-foreground">
          <button className="hover:text-foreground transition-colors">
            <Send className="size-4" />
          </button>
          <button className="hover:text-foreground transition-colors">
            <Bookmark className="size-4" />
          </button>
        </div>
      </div>

      {/* Main Reader Canvas */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16 md:py-24">
        {/* Tags */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {post.tags.map((t) => (
            <div key={t.tag.id} className="flex items-center gap-1.5">
              <span className="size-1 rounded-full bg-secondary hidden first:hidden md:block" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#92A9E1]">
                <span className="mr-1.5">•</span>
                {t.tag.name}
              </span>
            </div>
          ))}
          {post.tags.length === 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#92A9E1]">
                <span className="mr-1.5">•</span>REFLECTION
              </span>
            </div>
          )}
        </div>

        {/* Title & Author */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tighter text-foreground mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-20 pb-12 border-b border-border/10">
          <Avatar className="size-12">
            <AvatarImage src={post.author.image || ""} />
            <AvatarFallback className="bg-primary/20 text-primary font-bold">
              {post.author.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">{post.author.name}</span>
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>
        </div>

        {/* Content Body */}
        {/* We use font-serif for full immersion, as shown ideally in reading flows */}
        <article className="prose prose-lg md:prose-xl max-w-none font-serif text-muted-foreground leading-relaxed md:leading-loose">
          {paragraphs.map((para, i) => {
            // Very simple blockquote parser (if line starts with >)
            if (para.trim().startsWith(">")) {
              const quoteText = para.replace(/>/g, "").trim();
              return (
                <blockquote
                  key={i}
                  className="my-12 p-8 md:p-12 bg-muted/20 border-l-4 border-secondary rounded-r-3xl"
                >
                  <p className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-4 leading-snug">
                    "{quoteText}"
                  </p>
                </blockquote>
              );
            }
            return (
              <p key={i} className="mb-8">
                {para}
              </p>
            );
          })}
        </article>

        {/* Footer Area */}
        <div className="mt-32 pt-12 border-t border-border/10">
          <h4 className="font-heading font-bold text-foreground mb-6">End of Entry</h4>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div className="flex gap-4 w-full sm:w-auto">
              <Button className="rounded-full shadow-none bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8">
                Appreciate
              </Button>
              <Button
                variant="secondary"
                className="rounded-full shadow-none font-bold px-8 bg-muted/60 hover:bg-muted"
              >
                Share
              </Button>
            </div>

            <div className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-muted/30 border border-border/40 flex items-center gap-4 hover:bg-muted/50 transition-colors cursor-pointer">
              <Bookmark className="size-5 text-secondary" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">Save this entry</span>
                <span className="text-xs text-muted-foreground">
                  Add to reading list in your library.
                </span>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary ml-auto">
                Save
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Global Minimal Reader Footer */}
      <div className="py-16 flex flex-col items-center justify-center opacity-40">
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
  );
}
