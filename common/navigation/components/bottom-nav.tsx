"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/common/navigation/constants/nav-items";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-6"
    >
      <ul className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/70 bg-gradient-to-b from-white/70 to-white/40 p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_10px_30px_rgba(31,41,55,0.16)] ring-1 ring-white/40 backdrop-blur-2xl backdrop-saturate-180">
        {NAV_ITEMS.map((item) => {
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
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-zinc-500 hover:bg-white/35 hover:text-zinc-800",
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
