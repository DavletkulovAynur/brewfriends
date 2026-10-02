import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type EventsHeaderProps = {
  onSuggest?: () => void;
};

export function EventsHeader({ onSuggest }: EventsHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <Link
          href="/home"
          aria-label="Назад"
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          <ArrowLeft className="size-5" strokeWidth={1.5} />
        </Link>
        <h1 className="truncate text-2xl font-semibold">Встречи</h1>
      </div>

      <button
        type="button"
        onClick={onSuggest}
        className="shrink-0 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
      >
        Предложить встречу
      </button>
    </header>
  );
}
