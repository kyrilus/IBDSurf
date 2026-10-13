import Image from "next/image";
import type { Board } from "@/data/boards";
import { AddToCartButton } from "@/components/products/AddToCartButton";

type BoardDetailsProps = {
  board: Board;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function BoardDetails({ board }: BoardDetailsProps) {
  return (
    <article className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-transparent">
        <Image
          src={board.image}
          alt={`${board.title} surfboard`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority
          className="object-cover"
        />
      </div>

      <div className="rounded-[2rem] border border-stone-200 bg-transparent p-8 shadow-sm dark:border-stone-800">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
          Ian Blackmore Designs
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
          {board.title}
        </h1>
        <p className="mt-4 text-2xl font-semibold text-stone-950 dark:text-stone-50">
          {currencyFormatter.format(board.price)}
        </p>
        <p className="mt-6 leading-8 text-stone-600 dark:text-stone-300">
          {board.description}
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-2xl bg-stone-100 p-4 dark:bg-stone-900">
            <dt className="text-stone-500">Length</dt>
            <dd className="mt-1 font-semibold text-stone-950 dark:text-stone-50">
              {board.dimensions.length}
            </dd>
          </div>
          <div className="rounded-2xl bg-stone-100 p-4 dark:bg-stone-900">
            <dt className="text-stone-500">Width</dt>
            <dd className="mt-1 font-semibold text-stone-950 dark:text-stone-50">
              {board.dimensions.width}
            </dd>
          </div>
          <div className="rounded-2xl bg-stone-100 p-4 dark:bg-stone-900">
            <dt className="text-stone-500">Thickness</dt>
            <dd className="mt-1 font-semibold text-stone-950 dark:text-stone-50">
              {board.dimensions.thickness}
            </dd>
          </div>
          <div className="rounded-2xl bg-stone-100 p-4 dark:bg-stone-900">
            <dt className="text-stone-500">Volume</dt>
            <dd className="mt-1 font-semibold text-stone-950 dark:text-stone-50">
              {board.dimensions.volume ?? "Custom"}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <AddToCartButton
            id={board.id}
            title={board.title}
            price={board.price}
            currency={board.currency}
            available={board.available}
          />
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {board.available
              ? "In stock and available for secure checkout through Square."
              : "Currently shaped by request."}
          </p>
        </div>
      </div>
    </article>
  );
}
