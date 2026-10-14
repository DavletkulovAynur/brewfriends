import Image from "next/image";
import type { Film } from "@/components/features/films/constants/films";

export function FilmCard({ film }: { film: Film }) {
    return (
        <article className="flex w-[14vw] min-w-[120px] max-w-[364px] shrink-0 snap-start flex-col gap-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                <Image
                    src={film.posterSrc}
                    alt={`Постер фильма «${film.title}»`}
                    fill
                    sizes="(max-width: 640px) 24vw, 364px"
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="truncate text-base font-bold leading-tight">{film.title}</h3>
                <p className="text-sm  text-muted-foreground">{film.dateLabel}</p>
                <p className="text-sm  text-muted-foreground font-bold" aria-label={`Время показов: ${film.showtimes.join(", ")}`}>
                    {film.showtimes.join(" · ")}
                </p>
            </div>
        </article>
    );
}
