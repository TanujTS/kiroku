import { Skeleton } from "@/components/ui/skeleton";

export default function ReadPostLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      {/* Top Banner (Distraction-Free) Skeleton */}
      <div className="py-6 px-10 flex items-center justify-between border-b border-border/10 sticky top-0 bg-background/95 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
        <Skeleton className="h-3 w-40 rounded hidden md:block" />
        <div className="flex items-center gap-6">
          <Skeleton className="size-5 rounded" />
          <Skeleton className="size-5 rounded" />
        </div>
      </div>

      {/* Main Reader Canvas Skeleton */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16 md:py-24">
        {/* Tags */}
        <div className="flex gap-3 mb-8">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-3 w-20 rounded" />
        </div>

        {/* Title */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-16 w-full rounded" />
          <Skeleton className="h-16 w-3/4 rounded" />
        </div>

        {/* Author */}
        <div className="flex items-center gap-4 mb-20 pb-12 border-b border-border/10">
          <Skeleton className="size-12 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32 rounded" />
            <Skeleton className="h-3 w-24 rounded" />
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-8">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-[90%] rounded" />
          <Skeleton className="h-4 w-[95%] rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />

          {/* Blockquote simulation */}
          <div className="my-12 p-8 md:p-12 border-l-4 border-muted rounded-r-3xl space-y-4">
            <Skeleton className="h-6 w-full rounded" />
            <Skeleton className="h-6 w-5/6 rounded" />
          </div>

          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-[85%] rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
      </main>
    </div>
  );
}
