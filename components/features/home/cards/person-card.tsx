type PersonCardProps = {
  name: string;
  subtitle: string;
  interests: string[];
  actionLabel?: string;
};

export function PersonCard({
  name,
  subtitle,
  interests,
  actionLabel = "Написать в Telegram",
}: PersonCardProps) {
  return (
    <article className="flex w-44 shrink-0 flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <p className="font-medium">{name}</p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-wrap gap-1">
        {interests.map((interest) => (
          <span
            key={interest}
            className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
          >
            {interest}
          </span>
        ))}
      </div>

      <button
        type="button"
        className="mt-auto rounded-full bg-zinc-900 px-3 py-2 text-xs font-medium text-white dark:bg-white dark:text-zinc-900"
      >
        {actionLabel}
      </button>
    </article>
  );
}
