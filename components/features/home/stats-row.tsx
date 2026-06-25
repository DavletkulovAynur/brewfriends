import Link from "next/link";

type StatItem = {
  label: string;
  value: number;
  href: string;
};

type StatsRowProps = {
  items: StatItem[];
};

export function StatsRow({ items }: StatsRowProps) {
  return (
    <section className="grid grid-cols-3 gap-2">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="rounded-2xl border border-zinc-200 bg-white p-3 text-center transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
        >
          <p className="text-xl font-semibold">{item.value}</p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {item.label}
          </p>
        </Link>
      ))}
    </section>
  );
}
