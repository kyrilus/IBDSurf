import { getCustomPage, pageImage } from "@/sanity/content";
import type { Metadata } from "next";
import Image from "next/image";
import { CustomBoardRequestForm } from "@/components/custom/CustomBoardRequestForm";
import { eurostileExtended } from "@/lib/fonts";

const fallbackMetadata: Metadata = {
  title: "Custom Surfboards",
  description:
    "Start a custom Ian Blackmore Designs surfboard inquiry shaped around your waves, style, and goals.",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCustomPage();
  return {title: page?.seoTitle ?? page?.heading ?? fallbackMetadata.title, description: page?.seoDescription ?? fallbackMetadata.description};
}

export default async function CustomPage() {
  const content = await getCustomPage();
  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <Image
          src={pageImage(content?.backgroundImage, "/images/board-noses-new.JPG")}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          preload
        />
      </div>
      <section className="relative z-10 flex min-h-[24svh] items-center justify-center bg-transparent px-6 py-12 text-center lg:px-8">
        <h1 className={`${eurostileExtended.className} text-2xl font-bold leading-none tracking-[0.08em] text-stone-950 dark:text-white sm:text-3xl lg:text-4xl`}>
          {content?.heading ?? "CUSTOM BOARD ORDER"}
        </h1>
      </section>
      <section className="relative z-10">
        <CustomBoardRequestForm content={content} />
      </section>
    </div>
  );
}
