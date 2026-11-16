import type { Board } from "@/data/boards";
import { BoardCard } from "@/components/products/BoardCard";
import { CustomBoardCard } from "@/components/products/CustomBoardCard";

type BoardGridProps = {
  boards: Board[];
  transparentCards?: boolean;
  includeCustomBoard?: boolean;
  showPrices?: boolean;
  reducedSize?: boolean;
  interactiveEffects?: boolean;
  brightenOnHover?: boolean;
};

export function BoardGrid({
  boards,
  transparentCards = false,
  includeCustomBoard = false,
  showPrices = false,
  reducedSize = false,
  interactiveEffects = false,
  brightenOnHover,
}: BoardGridProps) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${reducedSize ? "xl:grid-cols-4" : ""}`}>
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          transparent={transparentCards}
          showPrice={showPrices}
          compactTitle={reducedSize}
          interactiveEffects={interactiveEffects}
          brightenOnHover={brightenOnHover}
        />
      ))}
      {includeCustomBoard ? (
        <CustomBoardCard
          transparent={transparentCards}
          compactTitle={reducedSize}
          interactiveEffects={interactiveEffects}
          brightenOnHover={brightenOnHover}
        />
      ) : null}
    </div>
  );
}
