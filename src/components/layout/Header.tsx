"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { HamburgerMenu } from "@/components/layout/HamburgerMenu";
import { eurostileExtended } from "@/lib/fonts";

export function Header() {
  const isHome = usePathname() === "/";

  return (
    <header
      className={isHome
        ? "absolute inset-x-0 top-0 z-40 bg-transparent"
        : "sticky top-0 z-40 border-b border-stone-200 bg-stone-50/90 backdrop-blur dark:border-stone-800 dark:bg-black/80"}
    >
      <div className="relative flex min-h-18 w-full items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <HamburgerMenu onDarkBackground={isHome} />
        <Link
          href="/"
          className={`${eurostileExtended.className} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-xl font-bold leading-none tracking-[0.08em] ${isHome ? "text-white" : "text-stone-950 dark:text-stone-50"}`}
        >
          <span className="sm:hidden">IBD</span>
          <span className="hidden sm:inline">IAN BLACKMORE DESIGNS</span>
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <CartDrawer onDarkBackground={isHome} />
        </div>
      </div>
    </header>
  );
}
