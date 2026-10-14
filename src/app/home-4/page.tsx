import type { Metadata } from "next";
import Image from "next/image";
import { HeroVideo } from "@/components/home/HeroVideo";
import { BoardGrid } from "@/components/products/BoardGrid";
import { eurostileExtended } from "@/lib/fonts";
import { getProducts } from "@/lib/square";

export const metadata: Metadata = {
  title: "Home 4",
};

export default async function HomeFourPage() {
  const boards = await getProducts();

  return (
    <div>
      <section
        data-hero-section
        className="home-hero relative isolate flex min-h-[70svh] flex-col items-center justify-center overflow-hidden bg-white px-6 py-24 text-center dark:bg-black sm:min-h-[75svh] lg:px-8"
      >
        <HeroVideo />
        <Image
          src="/logos/IBD-Logo-outline-white.svg"
          alt=""
          data-hero-logo
          width={865}
          height={1010}
          className="relative z-10 h-auto w-[8.4rem] sm:w-64 lg:w-72"
          preload
        />
      </section>

      <section className="surfboard-line-grid bg-white pb-32 pt-20 dark:bg-stone-950 sm:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1
            className={`${eurostileExtended.className} mb-10 text-center text-xl font-bold leading-none tracking-[0.08em] text-stone-950 dark:text-stone-50`}
          >
            SURFBOARDS
          </h1>
          {boards.length > 0 ? (
            <BoardGrid
              boards={boards}
              transparentCards
              includeCustomBoard
              interactiveEffects
            />
          ) : (
            <p className="text-stone-600 dark:text-stone-400">
              No boards are available right now. Check back soon.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
