import Image from "next/image";
import { BoardGrid } from "@/components/products/BoardGrid";
import { eurostileExtended } from "@/lib/fonts";
import { getProducts } from "@/lib/square";

export default async function Home() {
  const boards = await getProducts();

  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/board-rails.jpg"
          data-admin-image="home.background"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          preload
        />
      </div>
      <div className="fixed inset-0 z-[1] bg-black/60" aria-hidden="true" />
      <section
        data-hero-section
        className="home-hero relative z-10 flex min-h-[55svh] flex-col items-center justify-center overflow-hidden bg-transparent px-6 py-16 text-center sm:min-h-[60svh] sm:py-20 lg:px-8"
      >
        <Image
          src="/logos/IBD-Logo-outline-white.svg"
          data-admin-image="home.heroLogo"
          alt=""
          data-hero-logo
          width={865}
          height={1010}
          className="relative z-10 h-auto w-[8.4rem] translate-y-12 sm:w-64 sm:translate-y-14 lg:w-72"
          preload
        />
      </section>

      <section className="relative z-10 bg-transparent pb-32 pt-12 sm:pb-40 sm:pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1
            data-admin-text="home.heading"
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
              brightenOnHover={false}
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
