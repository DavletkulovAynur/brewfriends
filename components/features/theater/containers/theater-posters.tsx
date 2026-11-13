import Image from "next/image";

const performances = [
    {
        format: "Спектакль",
        image: "/theatre/theatre3.jpg",
        imageAlt: "Иллюстрация к спектаклю «ЗАЯТУЛЯК И ХЫУХЫЛУ»",
        title: "Ночь её откровений",
        date: "15 ноября · 19:00",
        venue: "Театр «Сцена»",
        city: "Казань",
    },
    {
        format: "Мюзикл",
        image: "/theatre/theatre2.jpg",
        imageAlt: "Тестовое изображение для спектакля «Сон в летнюю ночь»",
        title: "Сон в летнюю ночь",
        date: "22 ноября · 18:00",
        venue: "Театр имени Камала",
        city: "Казань",
    },
];

export function TheaterPosters() {
    return (
        <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 sm:text-2xl">
                Спектакли и мюзиклы
            </h2>
            <div className="overflow-hidden rounded-[28px] bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-50">
                {performances.map((performance) => (
                    <article key={performance.title} className="border-b border-zinc-200 p-4 last:border-b-0 dark:border-zinc-700 sm:p-5">
                        <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] items-start gap-4 sm:grid-cols-[230px_minmax(0,1fr)] sm:gap-6">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-muted">
                                <Image
                                    src={performance.image}
                                    alt={performance.imageAlt}
                                    fill
                                    sizes="(max-width: 640px) 40vw, 230px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="min-w-0 pt-1">
                                <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-medium tracking-wide text-sky-600 sm:text-sm">
                                    {performance.format}
                                </span>
                                <h3 className="mt-3 text-lg  font-semibold leading-tight sm:mt-5 sm:text-3xl">
                                    {performance.title}
                                </h3>
                                <p className="mt-3 text-sm font-semibold text-sky-600 sm:mt-5 sm:text-xl">
                                    {performance.date}
                                </p>
                                <p className="mt-3 text-sm text-zinc-500 sm:mt-5 sm:text-lg dark:text-zinc-400">
                                    {performance.venue}
                                </p>

                            </div>
                        </div>
                        {/* <div className="mt-5 flex items-center gap-2 border-t border-zinc-200 pt-4 text-sm text-zinc-600 sm:mt-6 sm:pt-5 sm:text-base dark:border-zinc-700 dark:text-zinc-300">
                            <UsersRound aria-hidden="true" className="size-5 shrink-0 text-sky-600" />
                            <span>Можно пойти вместе</span>
                        </div> */}
                    </article>
                ))}
            </div>
        </section>
    );
}