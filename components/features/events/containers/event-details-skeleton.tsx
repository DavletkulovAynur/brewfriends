import { Skeleton } from "@/components/ui/skeleton";

export function EventDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-24 w-full rounded-2xl" />
    </div>
  );
}
