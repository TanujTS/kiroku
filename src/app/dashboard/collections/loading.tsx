import { Skeleton } from "@/components/ui/skeleton";

export default function CollectionsLoading() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex-1 p-10 lg:px-14 pb-20 pt-16">
        <div className="max-w-2xl mb-16">
          <Skeleton className="h-14 w-3/4 mb-6 rounded-md" />
          <Skeleton className="h-6 w-full mb-2 rounded-md" />
          <Skeleton className="h-6 w-4/5 rounded-md" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`rounded-3xl min-h-[320px] ${
                i === 0 ? "md:col-span-2 bg-secondary/40" : "bg-card"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
