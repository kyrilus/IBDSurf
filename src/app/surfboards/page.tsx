import type { Metadata } from "next";
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
    <div className="surfboard-line-grid bg-white dark:bg-stone-950">
      <section className="flex min-h-[24svh] items-center justify-center bg-transparent px-6 py-12 text-center lg:px-8">
        <h1 data-admin-text="surfboards.heading" className={`${eurostileExtended.className} text-2xl font-bold leading-none tracking-[0.08em] text-stone-950 dark:text-white sm:text-3xl lg:text-4xl`}>
          SURFBOARDS
        </h1>
      </section>

      <section className="min-h-full bg-transparent pb-32 sm:pb-40">
        <SurfboardCatalog boards={boards} />
      </section>
    </div>
  );
}
