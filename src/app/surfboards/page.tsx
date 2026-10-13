import type { Metadata } from "next";
import Image from "next/image";
import { SurfboardCatalog } from "@/components/products/SurfboardCatalog";
import { eurostileExtended } from "@/lib/fonts";
import { getProducts } from "@/lib/square";

export const metadata: Metadata = {
  title: "Surfboards",
  description:
    "Browse Ian Blackmore Designs surfboards and custom board options.",
};

export default async function SurfboardsPage() {
  const boards = await getProducts();

  return (
    <>
      <section className="relative isolate flex min-h-[70svh] items-center justify-center overflow-hidden bg-black px-6 py-20 text-center sm:min-h-[75svh] sm:py-24 lg:px-8">
        <Image
          src="/images/fins.png"
          alt=""
          fill
          sizes="100vw"
          className="z-0 object-cover object-center"
          preload
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-10 bg-black/65" aria-hidden="true" />
        <div className="relative z-20 flex flex-col items-center">
          <Image
            src="/logos/IBD-Logo-thick-white.svg"
            alt=""
            data-hero-logo
            width={865}
            height={1010}
            className="mb-4 h-12 w-auto sm:mb-6 sm:h-16"
            aria-hidden="true"
          />
          <h1 className={`${eurostileExtended.className} text-3xl font-bold leading-none tracking-[0.08em] text-white sm:text-4xl lg:text-5xl`}>
            SURFBOARDS
          </h1>
        </div>
      </section>

      <section className="surfboard-line-grid min-h-full bg-white pb-32 dark:bg-stone-950 sm:pb-40">
        <SurfboardCatalog boards={boards} />
      </section>
    </>
  );
}
