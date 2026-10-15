"use client";

import { useRef } from "react";
import { FilmCard } from "@/components/features/films/components/film-card";
import { WEEK_FILMS } from "@/components/features/films/constants/films";

export function FilmsList() {
    const sliderRef = useRef<HTMLDivElement>(null);

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
                        <FilmCard key={film.id} film={film} />
                    ))}
                </div>
            </div>
        </section>
    );
}
