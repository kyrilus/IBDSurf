import Image from "next/image";
import Link from "next/link";
import { eurostileExtended } from "@/lib/fonts";

type CustomBoardCardProps = {
  transparent?: boolean;
};

export function CustomBoardCard({ transparent = false }: CustomBoardCardProps) {
  return (
    <article
      className={`group overflow-hidden rounded-[2rem] ${
        transparent
          ? "bg-transparent"
          : "border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-950"
      }`}
    >
      <Link href="/custom" className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-transparent">
          <div className="absolute inset-5 sm:inset-6">
            <Image
              src="/images/custom-board-outline.png"
              alt="Custom surfboard outline"
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="px-6 pb-6 pt-1 text-center">
          <h3 className={`${eurostileExtended.className} text-4xl font-bold uppercase leading-[0.95] text-stone-600 dark:text-stone-400`}>
            <span className="block">Custom</span>
            <span className="block">Board</span>
          </h3>
        </div>
      </Link>
    </article>
  );
}
