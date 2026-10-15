import { Skeleton } from "@/components/ui/skeleton";

export function ProfileLoadingSkeleton() {
    return (
        <div className="flex flex-1 flex-col gap-8 p-6 pt-4" role="status" aria-label="Loading profile">
            <Skeleton className="h-8 w-32" />
            <section className="flex flex-col gap-4 border-b border-border pb-6">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-14" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-3 w-48" />
                </div>
            </section>
            <section className="flex items-center justify-between gap-4 border-b border-border pb-6">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-6 w-11 rounded-full" />
            </section>
            <Skeleton className="h-10 w-32 rounded-md" />
        </div>
    );
}