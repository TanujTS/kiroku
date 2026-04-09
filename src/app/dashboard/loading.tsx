import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex-1 p-10 lg:px-14 pb-20">
        {/* Placeholder for Hero Section */}
        <div className="flex items-start justify-between mb-16">
          <div className="max-w-xl w-full">
            <Skeleton className="h-16 w-3/4 mb-6 rounded-md" />
            <Skeleton className="h-6 w-full mb-2 rounded-md" />
            <Skeleton className="h-6 w-5/6 rounded-md" />
          </div>

          {/* Placeholder for Stats Chips */}
          <div className="flex gap-6 mt-4">
            <Skeleton className="size-24 rounded-full" />
            <Skeleton className="size-24 rounded-full" />
          </div>
        </div>

        {/* Placeholder for BentoGrid Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
          {/* Bento Skeleton Layout Items */}
          <Skeleton className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 rounded-3xl" />
          <Skeleton className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 rounded-3xl" />
          <Skeleton className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2 rounded-3xl" />
          <Skeleton className="col-span-1 md:col-span-2 lg:col-span-1 row-span-1 rounded-3xl" />
          <Skeleton className="col-span-1 md:col-span-1 lg:col-span-2 row-span-1 rounded-3xl" />
          <Skeleton className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
