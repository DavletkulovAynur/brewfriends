import Image from "next/image";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import type { Film } from "@/components/features/films/constants/films";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

export function FilmDetailsSheet({
    film,
    onOpenChange,
}: {
    film: Film | null;
    onOpenChange: (open: boolean) => void;
}) {
    return (
        <Sheet open={film !== null} onOpenChange={onOpenChange}>
            <SheetContent
                side="bottom"
                className="max-h-[85dvh] overflow-y-auto rounded-t-2xl bg-background px-0 pt-0 sm:mx-auto sm:max-w-lg"
            >
                {film ? (
                    <div className="px-4 pb-6 pt-7">
                        <article className="flex min-h-[180px] overflow-hidden rounded-2xl border border-border bg-white">
                            <div className="relative w-[30%] shrink-0 bg-muted">
                                <Image
                                    src={film.posterSrc}
                                    alt={`Постер фильма «${film.title}»`}
                                    fill
                                    sizes="38vw"
                                    className="object-cover"
                                />
                                {film.ageRating ? (
                                    <span className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-xs font-bold text-foreground shadow-sm">
                                        {film.ageRating}
                                    </span>
                                ) : null}
                            </div>

                            <div className="flex min-w-0 flex-1 flex-col gap-3 p-3">
                                <SheetHeader className="p-0 text-left">
                                    <SheetTitle className="text-lg font-semibold leading-tight sr-only">{film.title}</SheetTitle>
                                    <SheetDescription className="sr-only">Информация о сеансах и месте показа</SheetDescription>
                                </SheetHeader>

                                <section className="grid grid-cols-2 gap-2" aria-label="Дата и время сеансов">
                                    <div className="min-w-0 rounded-lg bg-background p-2">
                                        <CalendarDays className="size-4 text-primary" aria-hidden="true" />
                                        <p className="mt-1 break-words text-xs font-medium">{film.dateLabel}</p>
                                    </div>
                                    <div className="min-w-0 rounded-lg bg-background p-2">
                                        <Ticket className="size-4 text-primary" aria-hidden="true" />
                                        {film.showtimes.length ? (
                                            <ul className="mt-1 flex flex-wrap gap-x-1 text-xs font-medium">
                                                {film.showtimes.map((showtime) => <li key={showtime}>{showtime}</li>)}
                                            </ul>
                                        ) : (
                                            <p className="mt-1 text-xs text-muted-foreground">Уточняется</p>
                                        )}
                                    </div>
                                </section>

                                <section className="mt-auto flex min-w-0 flex-col gap-1.5">
                                    <p className="flex items-center gap-1 text-[11px] leading-tight text-muted-foreground">
                                        <MapPin className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                                        <span className="line-clamp-2">просп. Октября, 85, остановка «Горсовет», Уфа</span>
                                    </p>
                                    <iframe
                                        title="Карта: проспект Октября, 85, остановка Горсовет, Уфа"
                                        src="https://yandex.ru/map-widget/v1/?ll=56.027785%2C54.774316&z=14&pt=56.027785%2C54.774316%2Cpm2rdm"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="h-24 w-full rounded-lg border-0 bg-muted"
                                    />
                                </section>
                            </div>
                        </article>

                        <section className="mt-5 flex flex-col gap-2 px-1">
                            <h3 className="text-lg font-bold">{film.title}</h3>
                            <p
                                className="text-lg leading-[1.4] leading-6 text-muted-foreground"
                                style={{ fontFamily: '"Times New Roman", Times, serif' }}
                            >
                                {film.description}
                            </p>
                        </section>

                        <section className="mt-5 rounded-xl bg-primary/5 p-4">
                            <h3 className="text-lg font-semibold">Почему стоит посмотреть</h3>
                            <p
                                className="mt-2 text-base leading-6 text-muted-foreground"
                                style={{ fontFamily: '"Times New Roman", Times, serif' }}
                            >
                                {film.whyWatch}
                            </p>
                        </section>

                        <section className="mt-5 rounded-xl border border-primary/20 bg-white p-4">
                            {film.requiresRegistration ? (
                                <>
                                    <p className="text-sm font-medium">Для посещения нужна предварительная запись.</p>
                                    {film.registrationUrl ? (
                                        <Button asChild size="lg" className="mt-3 w-full">
                                            <a href={film.registrationUrl} target="_blank" rel="noreferrer">
                                                Записаться
                                            </a>
                                        </Button>
                                    ) : (
                                        <Button type="button" size="lg" className="mt-3 w-full" disabled>
                                            Записаться
                                        </Button>
                                    )}
                                </>
                            ) : (
                                <p className="text-sm font-medium">Предварительная запись не нужна.</p>
                            )}
                        </section>
                    </div>
                ) : null}
            </SheetContent>
        </Sheet>
    );
}