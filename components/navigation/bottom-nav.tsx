"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Settings, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/map", label: "Map", icon: Map },
  { href: "/people", label: "People", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-6"
    >
      <ul className="pointer-events-auto flex items-center gap-1 rounded-full bg-zinc-900 p-1.5 shadow-lg shadow-black/20 ring-1 ring-white/10">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex size-12 items-center justify-center rounded-full transition-colors duration-200",
                  isActive
                    ? "bg-white text-zinc-900"
                    : "text-zinc-400 hover:text-white",
                )}
              >
                <Icon size={22} strokeWidth={1.5} aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
