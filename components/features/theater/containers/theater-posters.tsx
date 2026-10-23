import Image from "next/image";
import { Ruslan_Display } from "next/font/google";
import { SectionHeader } from "@/components/shared/section-header";

const ruslanDisplay = Ruslan_Display({
    subsets: ["cyrillic", "latin"],
    weight: "400",
});

export function TheaterPosters() {
    return (
        <section className="flex flex-col gap-3">
            <SectionHeader title="Спектакли и мюзиклы" />
            <article className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-4 sm:gap-8">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                    <Image
                        src="/theatre/theatre3.jpg"
                        alt="Иллюстрация к спектаклю «ЗАЯТУЛЯК И ХЫУХЫЛУ»"
                        fill
                        sizes="(max-width: 640px) 40vw, 360px"
                        className="object-cover"
                    />
                </div>
                <div className="relative z-10">
                    <h3 className={`${ruslanDisplay.className} text-3xl leading-[0.95] text-[#d72638] drop-shadow-[0_8px_8px_rgba(255,255,255,0.85)] sm:-ml-5 sm:text-4xl md:text-5xl`}>
                        Ночь её откровен
                    </h3>
                    <div className="mt-4 flex flex-col gap-1 text-sm">
                        <p className="font-semibold">15 ноября 2026, 19:00</p>
                        <p className="text-muted-foreground">Театр «Сцена», Казань · пример</p>
                    </div>
                </div>
            </article>
        </section>
    );
}