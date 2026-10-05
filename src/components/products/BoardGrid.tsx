import type { Board } from "@/data/boards";
import { BoardCard } from "@/components/products/BoardCard";

type BoardGridProps = {
  boards: Board[];
};

export function BoardGrid({ boards }: BoardGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
}
