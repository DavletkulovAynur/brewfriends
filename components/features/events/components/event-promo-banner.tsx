import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { monthlyPlace } from "@/components/features/events/data/monthly-place";

export function EventPromoBanner() {
    return (
        <Link
            href="/place-of-month"
            className="col-span-2 mt-6 mb-6 block overflow-hidden rounded-2xl bg-white text-zinc-950 transition-transform active:scale-[0.99]"
        >
            <article>
                <div className="relative aspect-[2.15/1]">
                    <Image
                        src={monthlyPlace.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                <div className="p-5">
                    <p className="text-base text-zinc-600">{monthlyPlace.badge}</p>
                    <h2 className="mt-2 font-serif text-xl font-bold leading-tight">
                        {monthlyPlace.title}
                    </h2>
                    <p className="mt-2 text-sm text-zinc-600">{monthlyPlace.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                        Подробнее <ArrowUpRight aria-hidden="true" className="size-4" />
                    </span>
                </div>
            </article>
        </Link>
    );
}
