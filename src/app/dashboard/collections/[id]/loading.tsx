import { Skeleton } from "@/components/ui/skeleton";

export default function CollectionLoading() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex-1 p-10 lg:px-14 pb-32 pt-16 max-w-4xl">
        {/* Collection Header */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-4 w-32 rounded bg-primary/20" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-6">
            <Skeleton className="h-16 w-3/4 max-w-md rounded" />

            <div className="flex items-center gap-4 shrink-0">
              <Skeleton className="size-12 rounded-full" />
              <Skeleton className="h-8 w-20 rounded" />
            </div>
          </div>

          <Skeleton className="h-6 w-full max-w-2xl mb-2 rounded" />
          <Skeleton className="h-6 w-3/4 max-w-2xl rounded" />
        </div>

        {/* Entries List */}
        <div className="flex flex-col gap-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1 space-y-4">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-8 w-3/4 max-w-sm rounded" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-4 w-32 rounded" />
                </div>
              </div>
              <Skeleton className="h-10 w-32 rounded-full hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
