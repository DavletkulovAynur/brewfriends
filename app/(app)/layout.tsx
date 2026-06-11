import Link from "next/link";

const navItems = [
  { href: "/map", label: "Map" },
  { href: "/people", label: "People" },
  { href: "/events", label: "Events" },
  { href: "/profile", label: "Profile" },
] as const;

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <main className="flex flex-1 flex-col">{children}</main>
      <nav className="sticky bottom-0 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <ul className="mx-auto flex max-w-lg justify-around px-4 py-3 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
