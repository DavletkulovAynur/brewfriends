import Link from "next/link";

type SectionHeaderProps = {
  title: string;
  href?: string;
  linkLabel?: string;
};

export function SectionHeader({ title, href, linkLabel }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-base font-semibold">{title}</h2>
      {href && linkLabel ? (
        <Link
          href={href}
          className="shrink-0 text-sm text-zinc-500 transition-colors hover:text-foreground dark:text-zinc-400"
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
