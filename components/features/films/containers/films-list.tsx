"use client";

import { useRef, useState } from "react";
import { FilmCard } from "@/components/features/films/components/film-card";
import { EventDetailsSheet } from "@/common/event-details/components/event-details-sheet";
import { WEEK_FILMS, type Film } from "@/components/features/films/constants/films";

const cinemaLocation = {
    label: "просп. Октября, 85, остановка «Горсовет», Уфа",
    map: {
        title: "Карта: проспект Октября, 85, остановка Горсовет, Уфа",
        src: "https://yandex.ru/map-widget/v1/?ll=56.027785%2C54.774316&z=14&pt=56.027785%2C54.774316%2Cpm2rdm",
    },
};

export function FilmsList() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

    return (
        <section className="flex flex-col gap-5 mt-4">
            <header className="flex flex-col gap-1">
                <h2 className="text-lg font-bold">ТВОЁ ТРЕТЬЕ МЕСТО</h2>
                <p className="text-sm text-muted-foreground">Кино, кофе и немного жизни между ними.</p>
            </header>
            <div className="relative ">
                <div
                    ref={sliderRef}
                    className="-mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {WEEK_FILMS.map((film) => (
                        <FilmCard key={film.id} film={film} onSelect={setSelectedFilm} />
                    ))}
                </div>
            </div>
            <EventDetailsSheet event={selectedFilm ? {
                title: selectedFilm.title,
                posterSrc: selectedFilm.posterSrc,
                dateLabel: selectedFilm.dateLabel,
                showtimes: selectedFilm.showtimes,
                ageRating: selectedFilm.ageRating,
                location: cinemaLocation,
                description: selectedFilm.description,
                highlight: { title: "Почему стоит посмотреть", text: selectedFilm.whyWatch },
                registration: { required: selectedFilm.requiresRegistration, url: selectedFilm.registrationUrl },
            } : null} onOpenChange={(open) => {
                if (!open) setSelectedFilm(null);
            }} />
        </section>
    );
}
