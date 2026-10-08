import Image from "next/image";
import Link from "next/link";
import type { Board } from "@/data/boards";

type BoardCardProps = {
  board: Board;
  transparent?: boolean;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function BoardCard({ board, transparent = false }: BoardCardProps) {
  return (
    <article
      className={`group overflow-hidden rounded-[2rem] transition-transform hover:-translate-y-1 ${
        transparent
          ? "bg-transparent"
          : "border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-950"
      }`}
    >
      <Link href={`/surfboards/${board.handle}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-stone-900">
          <Image
            src={board.image}
            alt={`${board.title} surfboard`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-stone-950 dark:text-stone-50">
                {board.title}
              </h3>
              <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                {board.dimensions.length} · {board.dimensions.width} ·{" "}
                {board.dimensions.thickness}
              </p>
            </div>
            <p className="text-base font-semibold text-stone-950 dark:text-stone-50">
              {currencyFormatter.format(board.price)}
            </p>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
              {board.available ? "Available" : "Made to Order"}
            </p>
            <span className="text-sm font-semibold text-stone-950 dark:text-stone-50">
              View Board
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
