"use client";

import type { BOARDS_PAGE_QUERY_RESULT } from "@/sanity/types";
import { matchesPriceRange, isCategoryMode } from "@/lib/catalog-filters";
import { useState } from "react";
import type { Board } from "@/data/boards";
import { BoardGrid } from "@/components/products/BoardGrid";
import { eurostileExtended } from "@/lib/fonts";

const defaultFilters = [
  { _key: "all", label: "All Boards", mode: "all" },
  { _key: "available", label: "Available", mode: "available" },
  { _key: "custom", label: "Custom", mode: "custom" },
];
const defaultPriceRanges = [
  {_key: "under-1000", label: "Under $1,000", minPrice: null, maxPrice: 1000},
  {_key: "1000-plus", label: "$1,000 & Up", minPrice: 1000, maxPrice: null},
];

type SurfboardCatalogProps = {
  boards: Board[];
  content?: BOARDS_PAGE_QUERY_RESULT;
};

export function SurfboardCatalog({ boards, content }: SurfboardCatalogProps) {
  const filters = (content?.categoryFilters ?? defaultFilters).filter(filter => isCategoryMode(filter.mode));
  const priceRanges = (content?.priceRanges ?? defaultPriceRanges).filter(range =>
    range.minPrice == null || range.maxPrice == null || range.maxPrice > range.minPrice,
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState("");
  const showCategoryFilters = content?.showCategoryFilters ?? true;
  const showPriceFilter = content?.showPriceFilter ?? true;
  const activeCategory = showCategoryFilters
    ? filters.find(filter => filter._key === selectedCategory) ?? filters[0]
    : undefined;
  const activeFilter = activeCategory?.mode ?? "all";
  const activePriceRange = showPriceFilter ? priceRanges.find(range => range._key === selectedPrice) : undefined;
  const categoryBoards = activeFilter === "available"
    ? boards.filter(board => board.available)
    : activeFilter === "custom" ? [] : boards;
  const visibleBoards = categoryBoards.filter(board => matchesPriceRange(board.price, activePriceRange));
  const showCustomBoard = (content?.showCustomBoard ?? true) && !activePriceRange
    && (activeFilter === "all" || activeFilter === "custom");

  return (
    <>
      {(showCategoryFilters || showPriceFilter) && <div>
        <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-4 px-6 py-5 sm:flex-row sm:items-center lg:px-8">
          {showCategoryFilters && filters.length > 0 && <>
          <span className={`${eurostileExtended.className} shrink-0 text-xs font-bold uppercase tracking-[0.08em] text-stone-500`}>
            {content?.filterLabel ?? "Filter"}
          </span>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = filter._key === activeCategory?._key;

              return (
                <button
                  key={filter._key}
                  type="button"
                  onClick={() => setSelectedCategory(filter._key)}
                  aria-pressed={isActive}
                  className={`${eurostileExtended.className} shrink-0 border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] transition-colors sm:px-4 sm:text-xs ${isActive ? "border-stone-950 bg-stone-950 text-white dark:border-white dark:bg-white dark:text-stone-950" : "border-stone-300 text-stone-500 hover:border-stone-950 hover:text-stone-950 dark:border-stone-700 dark:text-stone-400 dark:hover:border-white dark:hover:text-white"}`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
          </>}
          {showPriceFilter && <label className="flex w-full shrink-0 items-center justify-between gap-3 sm:ml-auto sm:w-auto sm:justify-start">
            <span className={`${eurostileExtended.className} text-xs font-bold uppercase tracking-[0.08em] text-stone-500`}>
              {content?.priceLabel ?? "Price"}
            </span>
            <select
              value={activePriceRange?._key ?? ""}
              onChange={(event) => setSelectedPrice(event.target.value)}
              className={`${eurostileExtended.className} h-9 min-w-0 flex-1 border border-stone-300 bg-transparent px-3 text-[10px] font-bold uppercase tracking-[0.08em] text-stone-600 outline-none transition-colors focus:border-stone-950 sm:flex-none sm:text-xs dark:border-stone-700 dark:text-stone-300 dark:focus:border-white`}
              aria-label={content?.priceLabel ?? "Filter surfboards by price"}
            >
              <option value="">{content?.anyPriceLabel ?? "Any Price"}</option>
              {priceRanges.map(range => <option key={range._key} value={range._key}>{range.label}</option>)}
            </select>
          </label>}
        </div>
      </div>}

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
            {content?.emptyMessage ?? "No boards match this filter right now."}
          </p>
        )}
      </div>
    </>
  );
}
