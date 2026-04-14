"use client";

import {
  IconArrowRight,
  IconCalendar,
  IconClock,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deletePostAction } from "@/actions/post";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostListItemProps {
  post: {
    id: string;
    title: string;
    category?: string;
    date: string;
    readTime: string;
  };
  href: string;
  actionLabel?: string;
}

export function PostListItem({ post, href, actionLabel = "Continue Writing" }: PostListItemProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, startTransaction] = useTransition();

  const handleDelete = () => {
    startTransaction(async () => {
      const res = await deletePostAction(post.id);
      if (res.success) {
        toast.success("Post deleted successfully");
      } else {
        toast.error(res.error || "Failed to delete post");
      }
      setIsDeleteDialogOpen(false);
    });
  };

  return (
    <>
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

        <div className="shrink-0 flex items-center justify-end gap-3">
          <Link href={href}>
            <Button className="rounded-full font-sans font-semibold px-6 shadow-none bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2">
              {actionLabel} <IconArrowRight className="size-4" />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:text-foreground"
              >
                <IconDotsVertical className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl font-sans">
              <DropdownMenuItem
                onClick={() => router.push(`/dashboard/new?id=${post.id}`)}
                className="gap-2 cursor-pointer"
              >
                <IconEdit className="size-4" />
                Edit Post
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsDeleteDialogOpen(true)}
                className="gap-2 cursor-pointer text-destructive focus:text-destructive"
              >
                <IconTrash className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="rounded-3xl p-8">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-2xl font-bold">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-sans text-base text-muted-foreground mt-2">
              This action cannot be undone. This will permanently delete the post
              <strong className="text-foreground font-semibold"> "{post.title}" </strong>
              and all of its contents.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-8 gap-3 sm:gap-0">
            <AlertDialogCancel
              className="rounded-full font-sans font-semibold"
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="rounded-full font-sans font-semibold bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Post"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
