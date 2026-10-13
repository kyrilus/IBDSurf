import Image from "next/image";
import Link from "next/link";
import type { Board } from "@/data/boards";
import { eurostileExtended } from "@/lib/fonts";

type BoardCardProps = {
  board: Board;
  transparent?: boolean;
};

export function BoardCard({ board, transparent = false }: BoardCardProps) {
  const titleWords = board.title.trim().split(/\s+/);
  const titleBreak = Math.ceil(titleWords.length / 2);
  const titleLines = [
    titleWords.slice(0, titleBreak).join(" "),
    titleWords.slice(titleBreak).join(" "),
  ].filter(Boolean);

  return (
    <article
      className={`group overflow-hidden rounded-[2rem] ${
        transparent
          ? "bg-transparent"
          : "border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-950"
      }`}
    >
      <Link href={`/surfboards/${board.handle}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-transparent">
          <div className="absolute inset-5 sm:inset-6">
            <Image
              src={board.image}
              alt={`${board.title} surfboard`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="px-6 pb-6 pt-1 text-center">
          <h3 className={`${eurostileExtended.className} text-4xl font-bold uppercase leading-[0.95] text-stone-600 dark:text-stone-400`}>
            {titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>
        </div>
      </Link>
    </article>
  );
}
