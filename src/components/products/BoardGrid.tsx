import type { Board } from "@/data/boards";
import { BoardCard } from "@/components/products/BoardCard";
import { CustomBoardCard } from "@/components/products/CustomBoardCard";

type BoardGridProps = {
  boards: Board[];
  transparentCards?: boolean;
  includeCustomBoard?: boolean;
};

export function BoardGrid({
  boards,
  transparentCards = false,
  includeCustomBoard = false,
}: BoardGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} transparent={transparentCards} />
      ))}
      {includeCustomBoard ? <CustomBoardCard transparent={transparentCards} /> : null}
    </div>
  );
}
