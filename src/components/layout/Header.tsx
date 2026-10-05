"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Navigation } from "@/components/layout/Navigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Header() {
  const isHome = usePathname() === "/";

  return (
    <header
      className={isHome
        ? "absolute inset-x-0 top-0 z-40 bg-transparent"
        : "sticky top-0 z-40 border-b border-stone-200 bg-stone-50/90 backdrop-blur dark:border-stone-800 dark:bg-black/80"}
    >
      <div className="grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-4 px-6 py-4 lg:grid-cols-[1fr_auto_1fr] lg:px-12">
        <Link href="/" className="inline-flex items-center justify-self-start" aria-label="Ian Blackmore Designs home">
          <Image
            src="/logos/IBD-Logo-thick-black.svg"
            alt=""
            width={865}
            height={1010}
            className="h-10 w-auto dark:hidden"
            priority
          />
          <Image
            src="/logos/IBD-Logo-thick-white.svg"
            alt=""
            width={865}
            height={1010}
            className="hidden h-10 w-auto dark:block"
            priority
          />
        </Link>
        <div className="col-span-2 row-start-2 justify-self-center lg:col-span-1 lg:col-start-2 lg:row-start-1">
          <Navigation />
        </div>
        <div className="col-start-2 row-start-1 flex items-center justify-self-end gap-4 lg:col-start-3">
          <ThemeToggle />
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
