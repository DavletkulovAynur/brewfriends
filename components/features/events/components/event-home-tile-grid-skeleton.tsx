import { EventPromoBanner } from "@/components/features/events/components/event-promo-banner";
import { Skeleton } from "@/components/ui/skeleton";

function EventCardSkeleton({ detailsBelow = false }: { detailsBelow?: boolean }) {
    if (detailsBelow) {
        return (
            <div className="flex w-full flex-col gap-2">
                <Skeleton className="aspect-[9/16] w-full rounded-2xl" />
                <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        );
    }

    return (
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-3xl bg-muted">
            <div className="flex h-full flex-col gap-2 p-3.5">
                <Skeleton className="h-6 w-2/3 bg-background/60" />
                <div className="mt-auto flex flex-col gap-1.5">
                    <Skeleton className="h-5 w-4/5 bg-background/60" />
                    <Skeleton className="h-4 w-3/4 bg-background/60" />
                </div>
            </div>
        </div>
    );
}

export function EventHomeTileGridSkeleton() {
    return (
        <div className="grid grid-cols-2 gap-3" aria-label="Загрузка встреч" aria-busy="true">
            <div className="flex flex-col gap-3" aria-hidden="true">
                <EventCardSkeleton />
                <EventCardSkeleton />
            </div>
            <div className="flex items-center" aria-hidden="true">
                <EventCardSkeleton detailsBelow />
            </div>
            <EventPromoBanner />
            <div className="flex items-center" aria-hidden="true">
                <EventCardSkeleton detailsBelow />
            </div>
            <div className="flex flex-col gap-3" aria-hidden="true">
                <EventCardSkeleton />
                <EventCardSkeleton />
            </div>
        </div>
    );
}