function toDateOnly(value: Date): Date {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

function parseEventDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatEventDateLabel(isoDate: string, now = new Date()): string {
  const eventDate = toDateOnly(parseEventDate(isoDate));
  const today = toDateOnly(now);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (eventDate.getTime() === today.getTime()) return "Сегодня";
  if (eventDate.getTime() === tomorrow.getTime()) return "Завтра";

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
  })
    .format(eventDate)
    .replace(/\s*г\./, "")
    .replace(".", "");
}
