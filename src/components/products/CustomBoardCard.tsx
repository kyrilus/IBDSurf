import Image from "next/image";
import Link from "next/link";
import { eurostileExtended } from "@/lib/fonts";

type CustomBoardCardProps = {
  transparent?: boolean;
  compactTitle?: boolean;
  scratchTitle?: boolean;
  brightenOnHover?: boolean;
};

export function CustomBoardCard({
  transparent = false,
  compactTitle = false,
  scratchTitle = false,
  brightenOnHover,
}: CustomBoardCardProps) {
  const shouldBrightenOnHover = brightenOnHover ?? scratchTitle;
  return (
    <article
      className={`group overflow-hidden transition-colors duration-300 ${
        scratchTitle ? "rounded-none" : "rounded-[2rem]"
      } ${
        shouldBrightenOnHover ? "hover:bg-white/70 dark:hover:bg-white/[0.025]" : ""
      } ${
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
          <h3 className={`${eurostileExtended.className} ${compactTitle ? "text-2xl sm:text-3xl" : "text-4xl"} ${scratchTitle ? "scratch-title" : ""} mx-auto w-fit font-bold uppercase leading-[0.95] text-stone-800 dark:text-stone-200`}>
            <span className="block">Custom</span>
            <span className="block">Board</span>
          </h3>
        </div>
      </Link>
    </article>
  );
}
