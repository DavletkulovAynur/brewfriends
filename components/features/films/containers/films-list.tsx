"use client";

import { useRef } from "react";
import { ChevronRight } from "lucide-react";
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
                    className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {WEEK_FILMS.map((film) => (
                        <FilmCard key={film.id} film={film} />
                    ))}
                </div>
                {/* <button
                    type="button"
                    aria-label="Следующие фильмы"
                    onClick={() => {
                        const slider = sliderRef.current;
                        slider?.scrollTo({ left: slider.scrollLeft + slider.clientWidth * 0.8, behavior: "smooth" });
                    }}
                    className="absolute right-2 top-[38%] z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 active:scale-95"
                >
                    <ChevronRight aria-hidden="true" size={24} strokeWidth={2.5} />
                </button> */}
            </div>
        </section>
    );
}
