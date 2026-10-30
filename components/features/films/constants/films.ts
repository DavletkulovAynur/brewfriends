export type Film = {
  id: string;
  title: string;
  posterSrc: string;
  dateLabel: string;
  showtimes: string[];
  description: string;
  whyWatch: string;
  ageRating?: string;
  requiresRegistration: boolean;
  registrationUrl?: string;
};

export const WEEK_FILMS: Film[] = [
  {
    id: "surfs-up",
    title: "Лови волну",
    posterSrc: "/posters/1.jpg",
    dateLabel: "12–16 окт.",
    showtimes: ["12:00"],
    ageRating: "6+",
    requiresRegistration: true,
    description: "Пингвин-сёрфер Коди Маверик отправляется на соревнование, чтобы доказать, что способен покорить большую волну.",
    whyWatch: "Лёгкая приключенческая комедия с серфингом, дружбой и энергией летних каникул.",
  },
  {
    id: "pocahontas",
    title: "Покахонтас",
    posterSrc: "/posters/2.jpg",
    dateLabel: "12–16 окт.",
    showtimes: ["13:30"],
    ageRating: "0+",
    requiresRegistration: false,
    description: "История Покахонтас, которая встречает Джона Смита во время прибытия английских поселенцев и пытается предотвратить конфликт между народами.",
    whyWatch: "Подойдёт для спокойного вечера: здесь запоминающаяся музыка, яркая анимация и история о выборе и взаимопонимании.",
  },
  {
    id: "intern",
    title: "Стажер",
    posterSrc: "/posters/3.jpg",
    dateLabel: "12–16 окт.",
    showtimes: ["15:00"],
    ageRating: "16+",
    requiresRegistration: true,
    description: "Пенсионер Бен становится стажёром в молодой компании онлайн-моды и постепенно помогает её основательнице Джулс справляться с работой и переменами.",
    whyWatch: "Тёплая комедия о разных поколениях, новом старте и поддержке, которая может прийти от неожиданного человека.",
  },
  {
    id: "gifted",
    title: "Одаренная",
    posterSrc: "/posters/4.jpg",
    dateLabel: "12–16 окт.",
    showtimes: ["17:00"],
    ageRating: "12+",
    requiresRegistration: false,
    description: "Фрэнк воспитывает свою племянницу Мэри, одарённую математикой. Спор о её будущем ставит под вопрос привычную семейную жизнь.",
    whyWatch: "Душевная семейная драма о заботе, взрослении и том, что важнее для ребёнка: особые возможности или обычное детство.",
  },
  {
    id: "revenant",
    title: "Выживший",
    posterSrc: "/posters/5.jpg",
    dateLabel: "12–16 окт.",
    showtimes: ["19:00"],
    ageRating: "18+",
    requiresRegistration: true,
    description: "После нападения медведя охотник Хью Гласс остаётся один в суровой глуши и борется за выживание, чтобы вернуться к людям.",
    whyWatch: "Для тех, кто любит напряжённые истории о выживании, сильную атмосферу дикой природы и визуально масштабное кино.",
  },
  {
    id: "happy-when-you-are-not",
    title: "Счастлив, когда ты нет",
    posterSrc: "/posters/6.jpg",
    dateLabel: "15 окт.",
    showtimes: ["19:00"],
    ageRating: "18+",
    requiresRegistration: false,
    description: "Романтическая комедия о двух людях, которые не стремятся к серьёзным отношениям, но неожиданно сближаются.",
    whyWatch: "Стоит выбрать, если хочется современную историю о неловких чувствах, самоиронии и отношениях без идеальных героев.",
  },
];
