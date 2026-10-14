import type { Metadata } from "next";
import Image from "next/image";
import { BoardGrid } from "@/components/products/BoardGrid";
import { eurostileExtended } from "@/lib/fonts";
import { getProducts } from "@/lib/square";

export const metadata: Metadata = {
  title: "Home 3",
};

export default async function HomeThreePage() {
  const boards = await getProducts();

  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/background-sample.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          preload
        />
      </div>
      <div className="fixed inset-0 z-[1] bg-black/65" aria-hidden="true" />
      <section
        data-hero-section
        className="home-hero relative z-10 flex min-h-[70svh] flex-col items-center justify-center overflow-hidden bg-transparent px-6 py-24 text-center sm:min-h-[75svh] lg:px-8"
      >
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

      <section className="relative z-10 bg-transparent pb-32 pt-20 sm:pb-40">
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
