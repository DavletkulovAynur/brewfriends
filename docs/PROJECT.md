# Brewfriends — описание проекта

Brewfriends — **Telegram Mini App** для поиска кофе-встреч и знакомств с людьми поблизости. Приложение помогает **найти** людей и кафе; общение происходит **в Telegram**, не внутри приложения.

Сейчас проект на стадии **архитектурного каркаса**: роутинг, слои данных и API заготовлены, UI и интеграции — в основном заглушки.

## Концепция продукта

```
Telegram Mini App                    Telegram
─────────────────                    ─────────
найти кафе рядом          →          написать человеку
увидеть людей в кафе                 договориться о встрече
просмотреть сообщество               общаться в привычном чате
```

**Нет встроенного мессенджера** — на карточке человека кнопка «Написать в Telegram» открывает `t.me/username` или deep link.

## Стек

| Слой | Технология |
|------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Язык | TypeScript (strict) |
| Стили | Tailwind CSS v4 |
| Иконки | Lucide React |
| Шрифты | Geist Sans / Geist Mono (`next/font`) |
| БД | PostgreSQL (Neon) + Drizzle ORM |
| Auth | Telegram Mini App `initData` + session cookie |
| Платформа | Telegram Mini App |

## Структура папок

```
brewfriends/
├── app/                  # Next.js App Router
│   ├── (app)/            # Основное приложение (нижняя навигация)
│   └── api/              # HTTP-эндпоинты
├── components/
│   ├── ui/               # Переиспользуемые UI-примитивы
│   └── features/         # Компоненты конкретных фич
├── domain/               # Типы и чистая бизнес-логика (без I/O)
├── server/
│   ├── repositories/     # Доступ к данным
│   └── services/         # Оркестрация бизнес-операций
├── lib/                  # Инфраструктура (db, ai, telegram, utils)
├── hooks/                # React-хуки
└── store/                # Клиентский state (при необходимости)
```

## Слои и поток данных

```
UI (страницы / компоненты)
        ↓
API routes  или  Server Components
        ↓
server/services/        — оркестрация
        ↓
server/repositories/    — чтение / запись данных
        ↓
domain/                 — типы и правила без побочных эффектов
```

**Правила:**

- `domain/` — только типы и чистые функции, без импортов из Next.js, БД или API.
- `server/repositories/` — единственное место, где происходит доступ к данным.
- `server/services/` — собирает операции из нескольких репозиториев и domain-логики.
- `app/api/` — тонкие HTTP-адаптеры; бизнес-логика здесь не пишется.

### Домены

| Модуль | Назначение |
|--------|------------|
| `domain/users/` | Тип `User`, Telegram-ссылки, проверка профиля |
| `domain/cafes/` | Тип `Cafe` — кофейни на карте |
| `domain/presence/` | Тип `UserPresence`, видимость на карте |
| `domain/events/` | Тип `Event` — встречи (отображаются на Home) |
| `domain/matching/` | Скоринг и подбор совпадений между пользователями |

### Ключевые типы

```ts
// domain/cafes/cafe.types.ts
type Cafe = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

// domain/presence/presence.types.ts
type PresenceStatus = "offline" | "online" | "in_cafe";

type UserPresence = {
  userId: string;
  status: PresenceStatus;
  isLocationShared: boolean;
  cafeId?: string;
  sharedUntil?: string;  // авто-скрытие через N часов
};

// domain/users/user.types.ts
type User = {
  id: string;
  name: string;
  bio?: string;
  interests: string[];
  telegramUsername?: string;
  telegramId?: string;
};
```

### Presence на карте

Пользователь виден на Map только если:

- `status === "in_cafe"`
- `isLocationShared === true`
- указан `cafeId`
- не истёк `sharedUntil`

Логика в `domain/presence/presence.logic.ts` → `isVisibleOnMap()`.

## Навигация (нижний таб)

| Таб | URL | Назначение |
|-----|-----|------------|
| **Home** | `/home` | Дайджест: кафе рядом, люди онлайн, встречи |

Подробный план экрана Home — в [docs/HOME.md](HOME.md).
| **Map** | `/map` | Карта кафе + люди, которые shared presence |
| **People** | `/people` | Сообщество, поиск, переход в Telegram |
| **Settings** | `/settings` | Профиль, интересы, приватность, Telegram |

| URL | Поведение |
|-----|-----------|
| `/` | Редирект на `/home` |
| `/profile` | Редирект на `/settings` (обратная совместимость) |
| `/events` | Редирект на `/home` (обратная совместимость) |

### Авторизация

Отдельных страниц `/login` и `/register` нет. Вход через Telegram Mini App (`initData`) или dev bypass; пользователь создаётся при первом входе (`upsertFromTelegram`), дальше сразу `/home`.

### API

| Метод | URL | Сервис |
|-------|-----|--------|
| `POST` | `/api/auth/telegram` | `authService` — login via initData / dev bypass |
| `GET` | `/api/auth/me` | текущий пользователь из session cookie |
| `GET` | `/api/users` | `userService.list()` |
| `GET` | `/api/cafes` | `cafeService.list()` |
| `GET` | `/api/presence` | видимые people для Home stories |
| `POST` | `/api/presence` | сохранить свой presence (opt-in, TTL 2ч) |
| `DELETE` | `/api/presence` | скрыть себя |
| `GET` | `/api/presence/me` | свой presence |
| `GET` | `/api/events` | `eventService.list()` |
| `GET` | `/api/matching` | `matchService.findMatches()` |

## Инфраструктура (`lib/`)

| Модуль | Статус | Назначение |
|--------|--------|------------|
| `lib/db/` | Готово | Neon + Drizzle; memory fallback без `DATABASE_URL` |
| `lib/ai/` | Заглушка | AI-клиент, промпты и tools для матчинга |
| `lib/telegram/` | Готово | WebApp SDK + серверная валидация `initData` |
| `lib/auth/` | Готово | JWT session cookie |
| `lib/utils/` | Готово | Утилиты (`cn` для классов) |

## Текущее состояние

| Область | Статус |
|---------|--------|
| Роутинг и layouts | Готово (`Home / Map / People / Settings`) |
| Domain-типы | `User`, `Cafe`, `UserPresence`, Telegram-логика |
| Repositories | users / cafes / presence (Neon или memory) |
| Services + API | auth, presence, cafes, users |
| UI-компоненты | Home stories + presence sheet на API |
| Карта | Не реализована |
| Presence sharing | Opt-in через sheet, TTL 2 часа |
| Telegram Mini App | SDK + initData auth (+ dev bypass) |
| База данных | Drizzle schema + `drizzle/0000_init.sql` |
| Тесты | Не настроены |

## Куда класть новый код

| Задача | Куда |
|--------|------|
| Новый тип или правило без I/O | `domain/<feature>/` |
| Запрос к БД | `server/repositories/` |
| Бизнес-операция | `server/services/` |
| HTTP-эндпоинт | `app/api/<resource>/route.ts` |
| Кнопка, инпут, карточка | `components/ui/` |
| Карта, presence, навигация | `components/features/<feature>/` |
| Страница | `app/(app)/<route>/page.tsx` |
| React-хук | `hooks/` |
| Клиентский state | `store/` |

## Рекомендуемый порядок разработки

1. Подключить Telegram Mini App SDK (`lib/telegram`) и авторизацию через `initData`.
2. Подключить БД (`lib/db`) и реализовать repositories для users, cafes, presence.
3. Реализовать Map: кафе рядом + люди с `isVisibleOnMap`.
4. Добавить кнопку «Я здесь» и таймер `sharedUntil`.
5. Карточка человека с кнопкой «Написать в Telegram» (`getTelegramChatUrl`).
6. Собрать Home-дайджест из cafes + presence + events.
7. Покрыть `domain/` unit-тестами.

## Запуск

Скопируйте `example.env` → `.env.local`. Без `DATABASE_URL` используется in-memory store (удобно для локальной разработки). С Neon: задайте `DATABASE_URL` и выполните `npm run db:push`.

```bash
npm install
npm run dev
```

Приложение: [http://localhost:3000](http://localhost:3000)

В браузере вне Telegram при `DEV_AUTH_BYPASS=1` создаётся dev-пользователь «Айнур».
