import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { monthlyPlace } from "@/components/features/events/data/monthly-place";

export default function PlaceOfMonthPage() {
    return (
        <div className="flex flex-1 flex-col gap-5 p-4 pt-4">
            <Link
                href="/home"
                className="inline-flex w-fit items-center gap-2 text-sm font-medium text-zinc-600"
            >
                <ArrowLeft aria-hidden="true" className="size-4" />
                К событиям
            </Link>

            <article className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white text-zinc-950">
                <div className="relative aspect-[2.15/1]">
                    <Image
                        src={monthlyPlace.image}
                        alt=""
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                    />
                </div>

                <div className="p-5 sm:p-7">
                    <p className="text-sm font-medium text-zinc-500">Место месяца</p>
                    <p className="mt-2 text-sm text-zinc-600">{monthlyPlace.badge}</p>
                    <h1 className="mt-2 font-serif text-3xl font-bold leading-tight">
                        {monthlyPlace.title}
                    </h1>
                    <p className="mt-3 text-base leading-6 text-zinc-600">
                        {monthlyPlace.description}
                    </p>

                    <section className="mt-7 border-t border-zinc-200 pt-5">
                        <h2 className="text-lg font-semibold">За рулём</h2>
                        <p className="mt-2 leading-6 text-zinc-600">
                            {monthlyPlace.formats.join(" · ")}
                        </p>
                        <p className="mt-2 leading-6 text-zinc-600">
                            {monthlyPlace.experiences.join(" · ")}
                        </p>
                    </section>

                    <dl className="mt-6 grid gap-4 border-t border-zinc-200 pt-5 sm:grid-cols-2">
                        <div>
                            <dt className="text-sm text-zinc-500">Где</dt>
                            <dd className="mt-1 font-medium">{monthlyPlace.location}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-zinc-500">Время работы</dt>
                            <dd className="mt-1 font-medium">{monthlyPlace.hours}</dd>
                        </div>
                    </dl>
                </div>
            </article>
        </div>
    );
}