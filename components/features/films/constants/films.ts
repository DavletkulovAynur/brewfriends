export type Film = {
  id: string;
  title: string;
  posterSrc: string;
  dateLabel: string;
  showtimes: string[];
};

export const WEEK_FILMS: Film[] = [
  { id: "surfs-up", title: "Лови волну", posterSrc: "/posters/1.jpg", dateLabel: "12–16 окт.", showtimes: ["12:00"] },
  { id: "pocahontas", title: "Покахонтас", posterSrc: "/posters/2.jpg", dateLabel: "12–16 окт.", showtimes: ["13:30"] },
  { id: "intern", title: "Стажер", posterSrc: "/posters/3.jpg", dateLabel: "12–16 окт.", showtimes: ["15:00"] },
  { id: "gifted", title: "Одаренная", posterSrc: "/posters/4.jpg", dateLabel: "12–16 окт.", showtimes: ["17:00"] },
  { id: "revenant", title: "Выживший", posterSrc: "/posters/5.jpg", dateLabel: "12–16 окт.", showtimes: ["19:00"] },
  {
    id: "happy-when-you-are-not",
    title: "Счастлив, когда ты нет",
    posterSrc: "/posters/6.jpg",
    dateLabel: "15 окт.",
    showtimes: ["19:00"],
  },
];
