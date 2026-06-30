import { EventBentoCard, type BentoEvent } from "./event-bento-card";
import { SectionHeader } from "@/components/features/home/shared/section-header";

type EventsBentoProps = {
  events: BentoEvent[];
};

export function EventsBento({ events }: EventsBentoProps) {
  const large = events.find((event) => event.size === "large");
  const medium = events.find((event) => event.size === "medium");

  return (
    <section className="flex flex-col gap-3">
      <SectionHeader title="Встречи" href="/events" linkLabel="Все" />

      <div className="grid grid-cols-2 gap-3">
        {large ? (
          <div className="row-span-2">
            <EventBentoCard event={large} />
          </div>
        ) : null}

        {medium ? <EventBentoCard event={medium} /> : null}
      </div>
    </section>
  );
}
