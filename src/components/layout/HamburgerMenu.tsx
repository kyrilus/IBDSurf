"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Navigation } from "@/components/layout/Navigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

type HamburgerMenuProps = {
  onDarkBackground?: boolean;
};

export function HamburgerMenu({ onDarkBackground = false }: HamburgerMenuProps) {
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
        aria-label="Open navigation menu"
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
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Site navigation">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
          />
          <aside
            id="site-navigation-menu"
            className="absolute left-0 top-0 flex h-full w-full max-w-xs flex-col border-r-[0.5px] border-white bg-white px-8 pb-6 pt-4 shadow-2xl dark:bg-stone-950"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute left-6 top-4 inline-flex h-10 w-10 items-center justify-center text-stone-950 transition-opacity hover:opacity-60 lg:left-8"
              aria-label="Close navigation menu"
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

            <div className="flex-1 pb-10 pt-20 lg:pl-2">
              <Navigation variant="menu" onNavigate={() => setIsOpen(false)} />
            </div>

            <div className="flex items-center justify-between border-t border-stone-200 pt-6 dark:border-stone-800">
              <Image
                src="/logos/IBD-Logo-thick-black.svg"
                alt="Ian Blackmore Designs"
                width={865}
                height={1010}
                className="h-10 w-auto dark:hidden"
              />
              <Image
                src="/logos/IBD-Logo-thick-white.svg"
                alt="Ian Blackmore Designs"
                width={865}
                height={1010}
                className="hidden h-10 w-auto dark:block"
              />
              <ThemeToggle />
            </div>
          </aside>
        </div>,
        document.body,
      ) : null}
    </div>
  );
}
