import { IconArrowRight, IconCalendar, IconClock } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PostListItemProps {
  post: {
    id: string;
    title: string;
    category?: string;
    date: string; // e.g. "Edited 2 hours ago" or "Edited Yesterday"
    readTime: string; // e.g. "6 min read estimated"
  };
  href: string;
  actionLabel?: string;
}

export function PostListItem({ post, href, actionLabel = "Continue Writing" }: PostListItemProps) {
  return (
    <div className="group flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-4xl bg-muted/60 hover:bg-muted transition-colors w-full">
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="size-1.5 rounded-full bg-primary" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary">
            {post.category || "Reflection"}
          </span>
        </div>

        <h3 className="text-2xl font-heading font-semibold tracking-tight text-foreground mb-4">
          {post.title}
        </h3>

        <div className="flex items-center gap-4 text-xs font-sans text-muted-foreground font-medium">
          <div className="flex items-center gap-1.5">
            <IconCalendar className="size-3.5" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IconClock className="size-3.5" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-end">
        <Link href={href}>
          <Button className="rounded-full font-sans font-semibold px-6 shadow-none bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2">
            {actionLabel} <IconArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
