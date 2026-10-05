import type { Metadata } from "next";
import { BoardGrid } from "@/components/products/BoardGrid";
import { getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Surfboards",
  description:
    "Browse Ian Blackmore Designs surfboards, currently powered by local placeholder product data and ready for Shopify.",
};

export default async function SurfboardsPage() {
  const boards = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
          Boards
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
          Surfboards
        </h1>
        <p className="mt-6 text-lg leading-8 text-stone-600 dark:text-stone-300">
          Temporary product data powers this page now. Later, this page can swap
          to Shopify Storefront API products without changing the card or grid UI.
        </p>
      </div>
      <BoardGrid boards={boards} />
    </div>
  );
}
