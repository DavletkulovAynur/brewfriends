import { EventHomeTileGrid, type BentoEvent } from "../components/event-bento-card";
import { SectionHeader } from "@/components/shared/section-header";

type EventsBentoProps = {
  events: BentoEvent[];
};

export function EventsBento({ events }: EventsBentoProps) {
  return (
    <section className="flex flex-col gap-3">
      <SectionHeader title="Встречи" href="/events" linkLabel="Все" />

      <EventHomeTileGrid events={events} />
    </section>
  );
}
