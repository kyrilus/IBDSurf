"use client";

import Image from "next/image";
import Link from "next/link";
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
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center text-stone-600 transition-colors hover:text-stone-950 dark:text-stone-400 dark:hover:text-white"
                aria-label="Open admin settings"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.86 2.86-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21H9.6v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.86-2.86.06-.06A1.7 1.7 0 0 0 4.2 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H2.4V9.6h.1A1.7 1.7 0 0 0 4.2 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06L6.66 3.8l.06.06A1.7 1.7 0 0 0 8.6 4.2a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V2.4h4v.1a1.7 1.7 0 0 0 1 1.7 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.86 2.86-.06.06A1.7 1.7 0 0 0 19.4 8.6a1.7 1.7 0 0 0 .6 1 1.7 1.7 0 0 0 1.1.4h.1v4h-.1a1.7 1.7 0 0 0-1.7 1Z" />
                </svg>
              </Link>
              <ThemeToggle />
            </div>
          </aside>
        </div>,
        document.body,
      ) : null}
    </div>
  );
}
