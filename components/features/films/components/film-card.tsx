import Image from "next/image";
import type { Film } from "@/components/features/films/constants/films";

export function FilmCard({ film, onSelect }: { film: Film; onSelect: (film: Film) => void }) {
    return (
        <button
            type="button"
            onClick={() => onSelect(film)}
            aria-label={`Подробнее о фильме «${film.title}»`}
            className="flex w-[14vw] min-w-[120px] max-w-[364px] shrink-0 snap-start flex-col gap-2 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-muted">
                <Image
                    src={film.posterSrc}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 24vw, 364px"
                    className="object-cover transition-transform duration-200 hover:scale-[1.03]"
                />
                {film.ageRating ? (
                    <span className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-xs font-bold text-foreground shadow-sm">
                        {film.ageRating}
                    </span>
                ) : null}
            </div>
            <span className="flex flex-col gap-1">
                <span className="truncate text-base font-bold leading-tight">{film.title}</span>
                <span className="text-sm text-muted-foreground">{film.dateLabel}</span>
                <span className="text-sm font-bold text-muted-foreground" aria-label={`Время показов: ${film.showtimes.join(", ")}`}>
                    {film.showtimes.join(" · ")}
                </span>
            </span>
        </button>
    );
}
