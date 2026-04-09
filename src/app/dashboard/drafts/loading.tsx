import { Skeleton } from "@/components/ui/skeleton";

export default function DraftsLoading() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex-1 p-10 lg:px-14 pb-20 pt-16 max-w-4xl">
        <div className="mb-16">
          <Skeleton className="h-16 w-1/2 mb-6 rounded-md" />
          <Skeleton className="h-6 w-full max-w-2xl mb-2 rounded-md" />
          <Skeleton className="h-6 w-3/4 max-w-2xl rounded-md" />
        </div>

        <div className="flex flex-col gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-4 rounded-xl border border-transparent"
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
