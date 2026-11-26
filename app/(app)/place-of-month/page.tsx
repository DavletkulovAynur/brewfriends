import { EventDetails } from "@/components/features/events/containers/event-details";
import { monthlyPlace } from "@/components/features/events/data/monthly-place";
import type { BentoEvent } from "@/components/features/events/types/bento-event.types";

const placeEvent = {
    id: "monthly-place",
    title: monthlyPlace.title,
    date: null,
    time: monthlyPlace.hours,
    location: monthlyPlace.location,
    color: "amber",
    imageUrl: monthlyPlace.image,
    description: monthlyPlace.description,
} satisfies BentoEvent;

export default function PlaceOfMonthPage() {
    return (
        <EventDetails
            event={placeEvent}
            eyebrow={`Место месяца · ${monthlyPlace.badge}`}
            metadata={[{ label: "Время работы", value: monthlyPlace.hours }]}
            contentSections={[
                {
                    title: "За рулём",
                    content: `Форматы: ${monthlyPlace.formats.join(" · ")}\nОпыт: ${monthlyPlace.experiences.join(" · ")}`,
                },
            ]}
            shareable={false}
        />
    );
}