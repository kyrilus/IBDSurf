"use client";

import { useState } from "react";
import type { Board } from "@/data/boards";
import { BoardGrid } from "@/components/products/BoardGrid";
import { eurostileExtended } from "@/lib/fonts";

type CatalogFilter = "all" | "available" | "custom";
type PriceFilter = "any" | "under-1000" | "1000-plus";

const filters: Array<{ label: string; value: CatalogFilter }> = [
  { label: "All Boards", value: "all" },
  { label: "Available", value: "available" },
  { label: "Custom", value: "custom" },
];

type SurfboardCatalogProps = {
  boards: Board[];
};

export function SurfboardCatalog({ boards }: SurfboardCatalogProps) {
  const [activeFilter, setActiveFilter] = useState<CatalogFilter>("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("any");
  const categoryBoards = activeFilter === "available"
    ? boards.filter((board) => board.available)
    : activeFilter === "custom"
      ? []
      : boards;
  const visibleBoards = categoryBoards.filter((board) => {
    if (priceFilter === "under-1000") return board.price < 1000;
    if (priceFilter === "1000-plus") return board.price >= 1000;
    return true;
  });
  const showCustomBoard = priceFilter === "any"
    && (activeFilter === "all" || activeFilter === "custom");

  return (
    <>
      <div>
        <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-4 px-6 py-5 sm:flex-row sm:items-center lg:px-8">
          <span className={`${eurostileExtended.className} shrink-0 text-xs font-bold uppercase tracking-[0.08em] text-stone-500`}>
            Filter
          </span>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = filter.value === activeFilter;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  aria-pressed={isActive}
                  className={`${eurostileExtended.className} shrink-0 border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] transition-colors sm:px-4 sm:text-xs ${isActive ? "border-stone-950 bg-stone-950 text-white dark:border-white dark:bg-white dark:text-stone-950" : "border-stone-300 text-stone-500 hover:border-stone-950 hover:text-stone-950 dark:border-stone-700 dark:text-stone-400 dark:hover:border-white dark:hover:text-white"}`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
          <label className="flex w-full shrink-0 items-center justify-between gap-3 sm:ml-auto sm:w-auto sm:justify-start">
            <span className={`${eurostileExtended.className} text-xs font-bold uppercase tracking-[0.08em] text-stone-500`}>
              Price
            </span>
            <select
              value={priceFilter}
              onChange={(event) => setPriceFilter(event.target.value as PriceFilter)}
              className={`${eurostileExtended.className} h-9 min-w-0 flex-1 border border-stone-300 bg-transparent px-3 text-[10px] font-bold uppercase tracking-[0.08em] text-stone-600 outline-none transition-colors focus:border-stone-950 sm:flex-none sm:text-xs dark:border-stone-700 dark:text-stone-300 dark:focus:border-white`}
              aria-label="Filter surfboards by price"
            >
              <option value="any">Any Price</option>
              <option value="under-1000">Under $1,000</option>
              <option value="1000-plus">$1,000 &amp; Up</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-20 lg:px-8">
        {visibleBoards.length > 0 || showCustomBoard ? (
          <BoardGrid
            boards={visibleBoards}
            transparentCards
            includeCustomBoard={showCustomBoard}
            showPrices
            reducedSize
            interactiveEffects
          />
        ) : (
          <p className="text-stone-600 dark:text-stone-400">
            No boards match this filter right now.
          </p>
        )}
      </div>
    </>
  );
}
