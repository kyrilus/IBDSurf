import Image from "next/image";
import { manic } from "@/lib/fonts";
import { BoardGrid } from "@/components/products/BoardGrid";
import { Button } from "@/components/common/Button";
import { getProducts } from "@/lib/shopify";

export default async function Home() {
  const boards = await getProducts();

  return (
    <div>
      <section className="relative isolate flex flex-col items-center overflow-hidden px-6 pb-20 pt-64 text-center md:pt-56 lg:px-8 lg:pb-28 lg:pt-64">
        <Image
          src="/images/hero/surf-tool-1.png"
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover object-center"
          preload
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-white/85 dark:bg-black/85"
        />
        <Image
          src="/logos/IBD-Logo-outline-black.svg"
          alt=""
          width={865}
          height={1010}
          className="h-auto w-48 dark:hidden sm:w-64 lg:w-72"
          preload
        />
        <Image
          src="/logos/IBD-Logo-outline-white.svg"
          alt=""
          width={865}
          height={1010}
          className="hidden h-auto w-48 dark:block sm:w-64 lg:w-72"
          preload
        />
        <h1 className={`${manic.className} mt-12 text-2xl font-normal text-stone-950 dark:text-stone-50 sm:mt-16 sm:text-4xl`}>
          IAN BlACKMORE DESIGNS
        </h1>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:mt-16 sm:flex-row">
          <Button href="/surfboards">Shop Boards</Button>
          <Button href="/custom" variant="secondary">
            Custom Order
          </Button>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-stone-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className={`${manic.className} mb-10 text-center text-[60px] font-normal text-stone-950 dark:text-stone-50`}>
            SURFBOARDS
          </h2>
          {boards.length > 0 ? (
            <BoardGrid boards={boards} />
          ) : (
            <p className="text-stone-600 dark:text-stone-400">
              No boards are available right now. Check back soon.
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-3 lg:px-8">
        <div className="rounded-[2rem] bg-stone-950 p-8 text-stone-50 md:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-400">
            Shaping Story
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Premium boards with a hand-shaped point of view.
          </h2>
          <p className="mt-5 max-w-2xl leading-8 text-stone-300">
            The site is organized around reusable product data and components, so
            future Shopify products, photography, pricing, inventory, and checkout
            can plug into the same customer-facing experience.
          </p>
        </div>
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 dark:border-stone-800 dark:bg-stone-950">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
            Custom Orders
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
            Talk through your next board.
          </h2>
          <p className="mt-4 text-sm leading-6 text-stone-600 dark:text-stone-400">
            Capture rider goals, preferred waves, and dimensions before the future
            Shopify checkout flow.
          </p>
          <Button href="/custom" className="mt-6 w-full" variant="secondary">
            Custom Inquiry
          </Button>
        </div>
      </section>
    </div>
  );
}
