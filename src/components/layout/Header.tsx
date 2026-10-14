"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { HamburgerMenu } from "@/components/layout/HamburgerMenu";
import { eurostileExtended } from "@/lib/fonts";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const usesHomeNavTransition =
    isHome || pathname === "/home-2" || pathname === "/home-3" || pathname === "/home-4";
  const hasStaticGridHero = pathname === "/home-2";
  const hasHomeHero = isHome || hasStaticGridHero || pathname === "/home-3" || pathname === "/home-4";
  const hasHeroHeader = hasHomeHero;
  const headerRef = useRef<HTMLElement>(null);
  const [hasHomeBackdrop, setHasHomeBackdrop] = useState(false);
  const [hasPassedHeroLogo, setHasPassedHeroLogo] = useState(false);
  const [hasReachedHeroEnd, setHasReachedHeroEnd] = useState(false);
  const [isGridHero, setIsGridHero] = useState(false);

  useEffect(() => {
    if (!hasHomeHero) return;

    function handleHeroModeChange(event: Event) {
      const { detail } = event as CustomEvent<{ mode?: string }>;
      setIsGridHero(detail.mode === "grid");
    }

    window.addEventListener("ibd:hero-mode-change", handleHeroModeChange);
    return () => window.removeEventListener("ibd:hero-mode-change", handleHeroModeChange);
  }, [hasHomeHero]);

  useEffect(() => {
    if (!hasHeroHeader) return;

    let frame = 0;

    function measureOverlap() {
      const header = headerRef.current;
      const heroLogo = document.querySelector<HTMLElement>("[data-hero-logo]");
      const heroSection = document.querySelector<HTMLElement>("[data-hero-section]");

      if (header && heroLogo) {
        const headerBottom = header.getBoundingClientRect().bottom;
        const logoBounds = heroLogo.getBoundingClientRect();
        const logoTop = logoBounds.top;
        setHasHomeBackdrop(logoTop <= headerBottom + 24);
        setHasPassedHeroLogo(logoBounds.bottom <= headerBottom);
        setHasReachedHeroEnd(
          heroSection ? heroSection.getBoundingClientRect().bottom <= headerBottom : false,
        );
      }
    }

    function scheduleMeasurement() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(measureOverlap);
    }

    scheduleMeasurement();
    window.addEventListener("scroll", scheduleMeasurement, { passive: true });
    window.addEventListener("resize", scheduleMeasurement);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleMeasurement);
      window.removeEventListener("resize", scheduleMeasurement);
    };
  }, [hasHeroHeader, pathname]);

  const showNavLogo = usesHomeNavTransition ? hasPassedHeroLogo : true;
  const usesDarkHeroControls = hasHeroHeader && !hasReachedHeroEnd && !(hasHomeHero && (isGridHero || hasStaticGridHero));

  return (
    <>
      <header
        ref={headerRef}
        className={hasHeroHeader
          ? `fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${hasReachedHeroEnd ? "bg-white/70 backdrop-blur-md dark:bg-black/35" : hasHomeHero && (isGridHero || hasStaticGridHero) ? "bg-transparent" : hasHomeBackdrop ? "bg-black/35 backdrop-blur-md" : "bg-transparent"}`
          : "fixed inset-x-0 top-0 z-40 bg-stone-50/90 backdrop-blur dark:bg-black/80"}
      >
        <div className="relative flex min-h-18 w-full items-center justify-between gap-6 px-6 py-4 lg:px-8">
          <HamburgerMenu onDarkBackground={usesDarkHeroControls} />
          <Link
            href="/"
            aria-label="Ian Blackmore Designs home"
            onClick={(event) => {
              if (!isHome) return;
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`${eurostileExtended.className} absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center whitespace-nowrap text-xl font-bold leading-none tracking-[0.08em] ${usesDarkHeroControls ? "text-white" : "text-stone-950 dark:text-stone-50"}`}
          >
            <span
              className={`[grid-area:1/1] transition-opacity duration-300 ${showNavLogo ? "opacity-0" : "opacity-100"}`}
            >
              <span className="sm:hidden">IBDESIGNS</span>
              <span className="hidden sm:inline">IAN BLACKMORE DESIGNS</span>
            </span>
            <Image
              src="/logos/IBD-Logo-thick-white.svg"
              alt=""
              width={865}
              height={1010}
              className={`h-10 w-auto [grid-area:1/1] transition-opacity duration-300 ${usesDarkHeroControls ? "" : "invert dark:invert-0"} ${showNavLogo ? "opacity-100" : "opacity-0"}`}
              aria-hidden="true"
            />
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <CartDrawer onDarkBackground={usesDarkHeroControls} />
          </div>
        </div>
      </header>
      {!hasHeroHeader ? <div className="h-18" aria-hidden="true" /> : null}
    </>
  );
}
