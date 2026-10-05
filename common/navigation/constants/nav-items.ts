import { Home, Settings, Users } from "lucide-react";
import type { NavigationItem } from "@/common/navigation/types/navigation.types";

export const NAV_ITEMS: NavigationItem[] = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/people", label: "People", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];