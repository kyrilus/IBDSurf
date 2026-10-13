import type { Metadata } from "next";
import { eurostileExtended, eurostileRegular } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "About IBD",
  description:
    "Learn about Ian Blackmore Designs and the shaping philosophy behind the boards.",
};

export default function AboutPage() {
  return (
    <div className="surfboard-line-grid bg-white dark:bg-stone-950">
      <section className="flex min-h-[24svh] items-center justify-center bg-transparent px-6 py-12 text-center lg:px-8">
        <h1 className={`${eurostileExtended.className} text-2xl font-bold leading-none tracking-[0.08em] text-stone-950 dark:text-white sm:text-3xl lg:text-4xl`}>
          ABOUT IBD
        </h1>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:pb-32">
        <div className="flex aspect-[4/3] w-full items-center justify-center border border-dashed border-stone-400 bg-white/50 dark:border-stone-600 dark:bg-black/30 sm:aspect-[3/2] lg:aspect-[4/5]">
          <div className="text-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="mx-auto h-10 w-10 text-stone-400 dark:text-stone-600"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="16" rx="1" />
              <circle cx="8.5" cy="9" r="1.5" />
              <path d="m4 17 5-5 4 4 2-2 5 5" />
            </svg>
            <p className={`${eurostileExtended.className} mt-4 text-xs font-bold uppercase tracking-[0.08em] text-stone-500`}>
              Image Placeholder
            </p>
          </div>
        </div>

        <div className="max-w-2xl">
          <p className={`${eurostileExtended.className} text-sm font-bold uppercase tracking-[0.08em] text-stone-500`}>
            Ian Blackmore Designs
          </p>
          <h2 className={`${eurostileExtended.className} mt-4 text-3xl font-bold uppercase leading-tight text-stone-950 dark:text-white sm:text-4xl`}>
            Built Around Feel
          </h2>
          <div className={`${eurostileRegular.className} mt-6 space-y-6 text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg`}>
            <p>
              Placeholder copy for Ian&apos;s story. Use this space to introduce his background,
              the path that led him to shaping surfboards, and the ideas behind Ian Blackmore Designs.
            </p>
            <p>
              Placeholder copy for the shaping philosophy. This section can describe how each board
              begins with the surfer, the waves they ride, and the feeling they want under their feet.
            </p>
            <p>
              Placeholder copy for materials, process, and craft. Add details about where the boards
              are shaped, how designs are refined, and what makes an IBD board distinct.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
