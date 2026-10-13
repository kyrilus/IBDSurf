import Image from "next/image";
import Link from "next/link";
import type { Board } from "@/data/boards";
import { eurostileExtended, eurostileRegular } from "@/lib/fonts";

type BoardCardProps = {
  board: Board;
  transparent?: boolean;
  showPrice?: boolean;
  vividBackgrounds?: boolean;
};

export function BoardCard({
  board,
  transparent = false,
  showPrice = false,
  vividBackgrounds = false,
}: BoardCardProps) {
  const isMeanMachine = board.title.trim().toLowerCase() === "mean machine";
  const showPlanarBackground = transparent && board.title.trim().toLowerCase() === "micro machine";
  const showLicensePlateBackground = transparent && board.title.trim().toLowerCase() === "middle weight";
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
          {isMeanMachine ? (
            <Image
              src="/images/Board Details/razor-blade.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className={`pointer-events-none scale-90 object-contain ${vividBackgrounds ? "opacity-[0.24]" : "opacity-[0.14]"}`}
              aria-hidden="true"
            />
          ) : null}
          {showPlanarBackground ? (
            <Image
              src="/images/planar.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className={`pointer-events-none scale-90 object-contain ${vividBackgrounds ? "opacity-[0.22]" : "opacity-[0.12]"}`}
              aria-hidden="true"
            />
          ) : null}
          {showLicensePlateBackground ? (
            <Image
              src="/images/license-plate.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className={`pointer-events-none scale-80 object-contain ${vividBackgrounds ? "opacity-[0.22]" : "opacity-[0.12]"}`}
              aria-hidden="true"
            />
          ) : null}
          <div className="absolute inset-5 z-10 sm:inset-6">
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
          <h3 className={`${eurostileExtended.className} text-4xl font-bold uppercase leading-[0.95] text-stone-800 dark:text-stone-200`}>
            {titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>
          {showPrice ? (
            <p className={`${eurostileRegular.className} mt-3 text-lg text-stone-500 dark:text-stone-400`}>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: board.currency,
                maximumFractionDigits: 0,
              }).format(board.price)}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
