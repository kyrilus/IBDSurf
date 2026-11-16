"use client";

import type { HEADER_QUERY_RESULT, MENU_QUERY_RESULT } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { eurostileExtended } from "@/lib/fonts";
import { Navigation } from "@/components/layout/Navigation";

type HamburgerMenuProps = {
  onDarkBackground?: boolean;
  content?: MENU_QUERY_RESULT;
  header?: HEADER_QUERY_RESULT;
};

export function HamburgerMenu({ onDarkBackground = false, content, header }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center text-stone-950 transition-colors hover:text-stone-500 dark:text-stone-50 dark:hover:text-stone-300"
        aria-label={content?.openLabel ?? "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="site-navigation-menu"
      >
        <Image
          src="/icons/hamburger-menu.svg"
          alt=""
          width={31}
          height={20}
          className={`h-auto w-6 sm:w-7 ${onDarkBackground ? "invert-0" : "invert dark:invert-0"}`}
          aria-hidden="true"
        />
      </button>

      {isOpen ? createPortal(
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={content?.title ?? "Site navigation"}>
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
            aria-label={content?.closeLabel ?? "Close navigation menu"}
          />
          <aside
            id="site-navigation-menu"
            className="absolute left-0 top-0 flex h-full w-full max-w-xs flex-col border-r-[0.5px] border-white bg-white px-8 pb-6 pt-4 shadow-2xl dark:bg-stone-950"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute left-6 top-4 inline-flex h-10 w-10 items-center justify-center text-stone-950 transition-opacity hover:opacity-60 lg:left-8"
              aria-label={content?.closeLabel ?? "Close navigation menu"}
            >
              <Image
                src="/icons/close.svg"
                alt=""
                width={25}
                height={26}
                className="h-auto w-6 invert dark:invert-0"
                aria-hidden="true"
              />
            </button>

            {(content?.showHeading ?? true) && (
              <h2 className={`${eurostileExtended.className} absolute right-8 top-4 flex h-10 max-w-[calc(100%-7rem)] items-center justify-end text-right text-sm font-bold uppercase leading-none tracking-[0.08em] text-stone-950 dark:text-stone-50 sm:text-lg`}>
                {content?.heading ?? "Menu"}
              </h2>
            )}

            <div className="flex-1 pb-10 pt-20 lg:pl-2">
              <Navigation content={content} variant="menu" onNavigate={() => setIsOpen(false)} />
            </div>

            <div className="flex items-center justify-between border-t border-stone-200 pt-6 dark:border-stone-800">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="inline-flex transition-opacity hover:opacity-60"
                aria-label={header?.homeLabel ?? "Ian Blackmore Designs home"}
              >
                <Image
                  src={header?.darkLogoUrl ?? "/logos/IBD-Logo-thick-black.svg"}
                  alt={header?.brandName ?? "Ian Blackmore Designs"}
                  width={865}
                  height={1010}
                  className="h-10 w-auto dark:hidden"
                />
                <Image
                  src={header?.lightLogoUrl ?? "/logos/IBD-Logo-thick-white.svg"}
                  alt={header?.brandName ?? "Ian Blackmore Designs"}
                  width={865}
                  height={1010}
                  className="hidden h-10 w-auto dark:block"
                />
              </Link>
            </div>
          </aside>
        </div>,
        document.body,
      ) : null}
    </div>
  );
}
