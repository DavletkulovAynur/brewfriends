import { Skeleton } from "@/components/ui/skeleton";

export function ProfileLoadingSkeleton() {
    return (
        <div className="flex flex-1 flex-col gap-5 p-6 pt-4" role="status" aria-label="Loading profile">
            <section className="-mx-3 flex flex-col items-center pb-2">
                <div className="relative h-44 w-full">
                    <Skeleton className="h-44 w-full rounded-[2rem]" />
                    <Skeleton className="absolute -bottom-12 left-1/2 size-28 -translate-x-1/2 rounded-full border-4 border-background" />
                </div>
                <Skeleton className="mt-14 h-8 w-36" />
            </section>

            <section className="flex flex-col gap-2">
                <Skeleton className="h-16 w-full rounded-full" />
                <Skeleton className="ml-4 h-4 w-16" />
            </section>

            <section className="flex min-h-14 items-center justify-between rounded-xl bg-white px-4">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="size-5" />
            </section>

            <section className="flex items-center justify-between gap-4 rounded-xl bg-white p-4">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-6 w-11 rounded-full" />
            </section>

            <Skeleton className="h-8 w-32 rounded-lg" />
        </div>
    );
}