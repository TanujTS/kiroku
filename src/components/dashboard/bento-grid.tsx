"use client";

import {
  IconPencil as Edit3,
  IconLink as LinkIcon,
  IconLock as Lock,
  IconDots as MoreHorizontal,
  IconArrowRight as MoveRight,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export type BentoPost = {
  id: string;
  title: string;
  snippet: string;
  date: string;
  readTime: string;
  status: string;
  category: string;
  tags: string[];
  featured: boolean;
  coverColor: string;
};

function getStatusIcon(status: string) {
  switch (status) {
    case "PUBLIC":
      return <div className="size-1.5 rounded-full bg-emerald-500" />;
    case "PRIVATE":
      return <Lock className="size-3" />;
    case "LINK-ONLY":
      return <LinkIcon className="size-3" />;
    case "DRAFT":
      return <Edit3 className="size-3" />;
    default:
      return <div className="size-1.5 rounded-full bg-primary" />;
  }
}

export function BentoGrid({ posts = [] }: { posts?: BentoPost[] }) {
  const featuredPost = posts[0] || {
    id: "placeholder",
    title: "Start Writing",
    snippet: "Create your first entry to populate your dashboard.",
    date: "",
    readTime: "",
    status: "PRIVATE",
    category: "",
    featured: false,
    coverColor: "bg-muted",
  };
  const rightColumnPosts = posts.length > 1 ? posts.slice(1, 4) : [];
  const bottomPosts = posts.length > 4 ? posts.slice(4, 6) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-min">
      {/* Featured Large Card (Spans 2 Cols) */}
      <Card className="lg:col-span-2 rounded-3xl border-0 bg-card shadow-sm overflow-hidden p-0 flex flex-col hover:shadow-md transition-shadow cursor-pointer">
        {/* Placeholder for the grey-white dotted device image */}
        <div className={`h-72 w-full ${featuredPost.coverColor} relative`}>
          {/* Mocking the device dots in the image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-48 bg-white/10 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/20 flex gap-4 p-8 justify-center pt-12 items-start" />
          </div>

          <div className="absolute top-6 left-6 flex gap-2">
            <Badge
              variant="secondary"
              className="bg-background/80 backdrop-blur font-sans font-medium text-xs gap-1.5 hover:bg-background"
            >
              {getStatusIcon(featuredPost.status)}
              {featuredPost.status}
            </Badge>
            <Badge className="bg-secondary text-secondary-foreground font-sans font-medium hover:bg-secondary/90 text-xs">
              {featuredPost.category}
            </Badge>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-sans tracking-widest font-semibold uppercase text-muted-foreground/70">
              {featuredPost.date} — {featuredPost.readTime}
            </span>
            <div className="flex gap-2 text-muted-foreground">
              <button className="hover:text-foreground transition-colors">
                <Edit3 className="size-4" />
              </button>
              <button className="hover:text-foreground transition-colors">
                <MoreHorizontal className="size-4" />
              </button>
            </div>
          </div>
          <h3 className="text-3xl font-heading font-bold tracking-tight text-foreground mb-4 leading-tight">
            {featuredPost.title}
          </h3>
          <p className="text-muted-foreground font-sans text-base leading-relaxed">
            {featuredPost.snippet}
          </p>
        </div>
      </Card>

      {/* Right Column (3 stacked smaller cards) */}
      <div className="flex flex-col gap-6">
        {rightColumnPosts.map((post) => (
          <Card
            key={post.id}
            className="rounded-3xl border-0 bg-card shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-center h-full"
          >
            <div className="flex items-center justify-between mb-4">
              <Badge
                variant="secondary"
                className="font-sans text-[10px] uppercase gap-1 hover:bg-muted font-bold text-muted-foreground bg-muted/50 tracking-wider ring-1 ring-border/20"
              >
                {getStatusIcon(post.status)}
                {post.status}
              </Badge>
              <span className="text-xs font-sans font-semibold text-muted-foreground/60">
                {post.date}
              </span>
            </div>
            <h4 className="text-lg font-sans font-bold tracking-tight text-foreground mb-2 leading-snug">
              {post.title}
            </h4>
            <p className="text-sm font-sans text-muted-foreground line-clamp-2 leading-relaxed">
              {post.snippet}
            </p>
          </Card>
        ))}
      </div>

      {/* Bottom Row */}
      {bottomPosts.length > 0 && (
        <Card className="rounded-3xl border-0 bg-card shadow-sm p-8 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-6">
            <Badge
              variant="secondary"
              className="bg-muted/50 font-sans font-medium text-xs gap-1.5 ring-1 ring-border/20 hover:bg-muted"
            >
              {getStatusIcon(bottomPosts[0].status)}
              {bottomPosts[0].status}
            </Badge>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <MoreHorizontal className="size-4" />
            </button>
          </div>
          <h4 className="text-2xl font-heading font-bold tracking-tight text-foreground mb-4">
            {bottomPosts[0].title}
          </h4>
          <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-6">
            {bottomPosts[0].snippet}
          </p>
          <div className="flex gap-2">
            {bottomPosts[0].tags?.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs font-sans text-muted-foreground border-border/40 bg-transparent"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* 2. Highlight Card (Dark Blue Letter) */}
      {bottomPosts.length > 1 && (
        <Card className="rounded-3xl border-0 bg-secondary shadow-sm p-8 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <Badge
                variant="secondary"
                className="bg-white/10 text-white hover:bg-white/20 border-0 font-sans text-xs gap-1.5 mb-6 backdrop-blur-sm"
              >
                <Lock className="size-3" />
                {bottomPosts[1].status}
              </Badge>
              <h4 className="text-2xl font-heading font-bold tracking-tight text-white mb-4 leading-tight">
                {bottomPosts[1].title}
              </h4>
              <p className="text-sm font-sans text-white/80 leading-relaxed italic">
                {bottomPosts[1].snippet}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-sans font-bold text-white uppercase tracking-widest mt-8 group-hover:gap-4 transition-all">
              Continue Writing <MoveRight className="size-4" />
            </div>
          </div>
          {/* Decorative Quote Mark */}
          <div className="absolute -bottom-8 -right-4 text-9xl text-white/10 font-heading font-bold select-none">
            "
          </div>
        </Card>
      )}
    </div>
  );
}
