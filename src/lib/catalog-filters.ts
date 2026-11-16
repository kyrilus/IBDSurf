type PriceRange = { minPrice?: number | null; maxPrice?: number | null };

export function matchesPriceRange(price: number, range?: PriceRange) {
  return !range || (
    (range.minPrice == null || price >= range.minPrice) &&
    (range.maxPrice == null || price < range.maxPrice)
  );
}

export function isCategoryMode(mode: unknown): mode is "all" | "available" | "custom" {
  return mode === "all" || mode === "available" || mode === "custom";
}
