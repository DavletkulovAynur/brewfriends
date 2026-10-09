import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config({ path: ".env.local" });
config();

const sql = neon(process.env.DATABASE_URL);

// day offset from today, start hour, duration in hours
const seed = [
  { id: "seed-1", title: "Coffee & Code", location: "Starbucks, Невский", color: "amber", day: 1, hour: 14, hours: 1.5, description: "Работаем и общаемся за кофе. Берите ноутбуки." },
  { id: "seed-2", title: "Morning Brew", location: "Double B", color: "sky", day: 2, hour: 10, hours: 1, imageUrl: "/events/vertical1.png", description: "Утренняя встреча за кофе перед рабочим днём." },
  { id: "seed-3", title: "Latte & Learn", location: "Surf Coffee", color: "rose", day: 3, hour: 18, hours: 1, imageUrl: "/events/vertical2.png", description: "Короткие доклады участников и обсуждение." },
  { id: "seed-4", title: "Espresso Talks", location: "Skuratov Coffee", color: "amber", day: 4, hour: 12, hours: 1, description: "Разговоры о кофе и не только." },
  { id: "seed-5", title: "Flat White Friday", location: "Starbucks, Московский", color: "sky", day: 5, hour: 17.5, hours: 1.5, description: "Пятничная встреча, чтобы завершить неделю." },
  { id: "seed-6", title: "Cappuccino & Chat", location: "Double B", color: "rose", day: 6, hour: 11, hours: 1.5, description: "Неформальное общение за капучино." },
];

function at(day, hour) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + day);
  // Local event time in Moscow (UTC+3).
  date.setUTCHours(0, 0, 0, 0);
  return new Date(date.getTime() + (hour - 3) * 3600 * 1000);
}

for (const event of seed) {
  await sql.query(
    `INSERT INTO events (id, title, description, location, starts_at, ends_at, image_url, color)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (id) DO NOTHING`,
    [
      event.id,
      event.title,
      event.description,
      event.location,
      at(event.day, event.hour).toISOString(),
      at(event.day, event.hour + event.hours).toISOString(),
      event.imageUrl ?? null,
      event.color,
    ],
  );
}

const [{ count }] = await sql.query("SELECT count(*)::int AS count FROM events");
console.log(`events in table: ${count}`);
