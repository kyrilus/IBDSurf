"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { eurostileExtended } from "@/lib/fonts";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/surfboards", label: "Boards" },
  { href: "/custom", label: "Custom" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type NavigationProps = {
  variant?: "inline" | "menu";
  onNavigate?: () => void;
};

export function Navigation({ variant = "inline", onNavigate }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className={
        variant === "menu"
          ? "flex flex-col items-start gap-7"
          : "flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:gap-x-10"
      }
    >
      {navigationItems.map((item) => {
        const isActive = item.href === "/"
          ? pathname === "/"
          : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={
              variant === "menu"
                ? `${eurostileExtended.className} inline-flex items-center gap-3 text-sm font-bold uppercase leading-none tracking-[0.08em] transition-colors hover:text-stone-700 dark:hover:text-stone-300 sm:text-lg ${isActive ? "text-stone-950 dark:text-stone-50" : "text-stone-400 dark:text-stone-500"}`
                : "text-lg font-normal uppercase tracking-wide text-stone-700 transition-colors hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-50"
            }
          >
            {variant === "menu" ? (
              <span
                className={`h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-current ${isActive ? "opacity-100" : "opacity-20"}`}
                aria-hidden="true"
              />
            ) : null}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
