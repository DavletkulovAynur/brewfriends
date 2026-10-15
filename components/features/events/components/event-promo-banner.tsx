import Image from "next/image";

export function EventPromoBanner() {
    return (
        <aside className="relative col-span-2 flex min-h-36 items-end overflow-hidden rounded-2xl bg-zinc-900 p-4 text-white">

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <p className="relative text-lg font-semibold">Кино, кофе и встречи по соседству</p>
        </aside>
    );
}