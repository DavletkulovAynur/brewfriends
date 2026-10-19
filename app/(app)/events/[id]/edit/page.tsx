import { EventEditForm } from "@/components/features/events/containers/event-edit-form";

export default async function EditEventPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <EventEditForm eventId={id} />;
}
