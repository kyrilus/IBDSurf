import { getBoardsPage, pageImage } from "@/sanity/content";
import Image from "next/image";
import type { Metadata } from "next";
import { SurfboardCatalog } from "@/components/products/SurfboardCatalog";
import { eurostileExtended } from "@/lib/fonts";
import { getProducts } from "@/lib/square";

const fallbackMetadata: Metadata = {
  title: "Surfboards",
  description:
    "Browse Ian Blackmore Designs surfboards and custom board options.",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getBoardsPage();
  return {title: page?.seoTitle ?? fallbackMetadata.title, description: page?.seoDescription ?? fallbackMetadata.description};
}

export default async function SurfboardsPage() {
  const [boards, content] = await Promise.all([getProducts(), getBoardsPage()]);
  const backgroundImage = content?.backgroundImage?.asset?._ref
    ? pageImage(content.backgroundImage, "")
    : null;


  return (
    <div className={backgroundImage ? "relative isolate min-h-screen overflow-hidden" : "surfboard-line-grid bg-white dark:bg-stone-950"}>
      {backgroundImage && (
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            preload
          />
        </div>
      )}
      <section className="relative z-10 flex min-h-[24svh] items-center justify-center bg-transparent px-6 py-12 text-center lg:px-8">
        <h1 className={`${eurostileExtended.className} text-2xl font-bold leading-none tracking-[0.08em] text-stone-950 dark:text-white sm:text-3xl lg:text-4xl`}>
          {content?.heading ?? "SURFBOARDS"}
        </h1>
      </section>

      <section className="relative z-10 min-h-full bg-transparent pb-32 sm:pb-40">
        <SurfboardCatalog boards={boards} content={content} />
      </section>
    </div>
  );
}
