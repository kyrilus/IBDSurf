import { PortableText } from "next-sanity";
import { getAboutPage, pageImage } from "@/sanity/content";
import type { Metadata } from "next";
import Image from "next/image";
import { eurostileExtended, eurostileRegular } from "@/lib/fonts";

const fallbackMetadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ian Blackmore Designs and the shaping philosophy behind the boards.",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
  return {title: page?.seo?.title ?? fallbackMetadata.title, description: page?.seo?.description ?? fallbackMetadata.description};
}

export default async function AboutPage() {
  const page = await getAboutPage();
  return (
    <div className="surfboard-line-grid bg-white dark:bg-stone-950">
      <section className="flex min-h-[24svh] items-center justify-center bg-transparent px-6 py-12 text-center lg:px-8">
        <h1 className={`${eurostileExtended.className} text-2xl font-bold leading-none tracking-[0.08em] text-stone-950 dark:text-white sm:text-3xl lg:text-4xl`}>
          {page?.title ?? "ABOUT US"}
        </h1>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:pb-32">
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[3/2] lg:aspect-[4/5]">
          <Image
            src={pageImage(page?.image, "/images/background-sample.png")}
            alt={page?.image?.alt ?? "Ian Blackmore Designs"}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="max-w-2xl">
          <p className={`${eurostileExtended.className} text-sm font-bold uppercase tracking-[0.08em] text-stone-500`}>
            {page?.eyebrow ?? "Ian Blackmore Designs"}
          </p>
          <h2 className={`${eurostileExtended.className} mt-4 text-3xl font-bold uppercase leading-tight text-stone-950 dark:text-white sm:text-4xl`}>
            {page?.heading ?? "Built Around Feel"}
          </h2>
          <div className={`${eurostileRegular.className} mt-6 space-y-6 text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg`}>
            {page?.body?.length ? <PortableText value={page.body} /> : <>
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
            </>}
          </div>
        </div>
      </section>
    </div>
  );
}
