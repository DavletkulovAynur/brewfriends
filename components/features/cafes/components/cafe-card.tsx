type CafeCardProps = {
  name: string;
  distance: string;
  peopleCount: number;
};

export function CafeCard({ name, distance, peopleCount }: CafeCardProps) {
  return (
    <article className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <p className="font-medium">{name}</p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {distance}
        </p>
      </div>
      <p className="shrink-0 text-sm text-zinc-500 dark:text-zinc-400">
        {peopleCount} чел.
      </p>
    </article>
  );
}
