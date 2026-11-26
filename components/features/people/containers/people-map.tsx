"use client";

import { useEffect, useRef, useState } from "react";
import { Coffee, MapPin } from "lucide-react";
import type { Map as LeafletMap } from "leaflet";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type Cafe = {
    id: string;
    name: string;
    area: string;
    coordinates: [number, number];
};

const cafes: Cafe[] = [
    { id: "demo-center", name: "Кофейня в центре", area: "Центр Уфы", coordinates: [55.9588, 54.7204] },
    { id: "demo-park", name: "Кофейня у парка", area: "Рядом с парком Якутова, Уфа", coordinates: [55.9518, 54.7353] },
];

export function PeopleMap() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
    const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "error">("loading");

    useEffect(() => {
        let map: LeafletMap | undefined;
        let cancelled = false;
        const loadingTimeout = window.setTimeout(() => {
            if (!cancelled) setMapStatus("error");
        }, 20000);

        async function initializeMap() {
            const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
            if (!apiKey || !mapContainer.current) {
                setMapStatus("error");
                return;
            }

            try {
                const { map: createMap, tileLayer, marker, divIcon, latLngBounds, control } = await import("leaflet");
                if (cancelled || !mapContainer.current) return;

                map = createMap(mapContainer.current, { zoomControl: false });
                control.zoom({ position: "topright" }).addTo(map);
                const tiles = tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${encodeURIComponent(apiKey)}`, {
                    maxZoom: 19,
                    attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
                });
                tiles.on("tileload", () => {
                    window.clearTimeout(loadingTimeout);
                    if (!cancelled) setMapStatus("ready");
                });
                tiles.addTo(map);
                map.fitBounds(latLngBounds(cafes.map((cafe) => [cafe.coordinates[1], cafe.coordinates[0]])), {
                    paddingTopLeft: [50, 60],
                    paddingBottomRight: [50, 150],
                    maxZoom: 13,
                });

                for (const cafe of cafes) {
                    const cafeMarker = marker([cafe.coordinates[1], cafe.coordinates[0]], {
                        title: `Открыть: ${cafe.name}`,
                        icon: divIcon({
                            className: "grid size-11 cursor-pointer place-items-center rounded-full border-2 border-white bg-[#1d92d2] text-xl shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e1621]",
                            html: '<span class="flex h-full w-full items-center justify-center">☕</span>',
                            iconSize: [44, 44],
                            iconAnchor: [22, 22],
                        }),
                    }).addTo(map);
                    cafeMarker.on("click", () => setSelectedCafe(cafe));
                    cafeMarker.getElement()?.setAttribute("aria-label", `Открыть: ${cafe.name}`);
                }
            } catch {
                if (!cancelled) setMapStatus("error");
            }
        }

        void initializeMap();
        return () => {
            cancelled = true;
            window.clearTimeout(loadingTimeout);
            map?.remove();
        };
    }, []);

    return (
        <>
            <div className="fixed inset-0 isolate z-0 bg-muted">
                <div ref={mapContainer} className="h-full w-full" aria-label="Карта кафе в Уфе" />
                {mapStatus !== "ready" ? (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6 text-center" role="status">
                        <p className="rounded-lg bg-card px-4 py-3 text-sm text-card-foreground shadow-sm">
                            {mapStatus === "loading" ? "Загружаем карту..." : "Не удалось загрузить карту. Проверьте подключение и настройки MapTiler."}
                        </p>
                    </div>
                ) : null}
            </div>
            <Sheet open={selectedCafe !== null} onOpenChange={(open) => { if (!open) setSelectedCafe(null); }}>
                <SheetContent side="bottom" className="rounded-t-2xl px-6 pb-8 pt-7 sm:mx-auto sm:max-w-lg">
                    {selectedCafe ? (
                        <>
                            <SheetHeader className="gap-2 p-0 pr-12 text-left">
                                <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Coffee className="size-5" aria-hidden="true" />
                                </span>
                                <SheetTitle className="mt-2 text-xl font-semibold">{selectedCafe.name}</SheetTitle>
                                <SheetDescription className="flex items-center gap-1.5">
                                    <MapPin className="size-4 shrink-0" aria-hidden="true" />
                                    {selectedCafe.area}
                                </SheetDescription>
                            </SheetHeader>
                            <p className="text-sm text-muted-foreground">Это тестовая точка на карте.</p>
                        </>
                    ) : null}
                </SheetContent>
            </Sheet>
        </>
    );
}