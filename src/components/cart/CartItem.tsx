import Image from "next/image";
import { eurostileExtended } from "@/lib/fonts";

export type CartLine = {
  id: string;
  title: string;
  image?: string;
  quantity: number;
  price: number;
  currency: string;
};

type CartItemProps = {
  item: CartLine;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function CartItem({ item, onDecrease, onIncrease, onRemove }: CartItemProps) {
  return (
    <li className="flex items-start justify-between gap-4 border-b border-stone-200 py-5 last:border-b-0 dark:border-stone-800">
      {item.image ? (
        <div className="relative h-28 w-20 shrink-0 overflow-hidden">
          <Image
            src={item.image}
            alt={`${item.title} surfboard`}
            fill
            sizes="80px"
            className="object-contain"
          />
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <p className={`${eurostileExtended.className} font-bold uppercase text-stone-950 dark:text-stone-50`}>
          {item.title}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={onDecrease}
            className="h-8 w-8 border border-stone-300 text-stone-950 hover:border-stone-950 dark:border-stone-700 dark:text-stone-50 dark:hover:border-stone-50"
            aria-label={`Decrease ${item.title} quantity`}
          >
            −
          </button>
          <span className="min-w-6 text-center text-sm text-stone-700 dark:text-stone-300">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={onIncrease}
            className="h-8 w-8 border border-stone-300 text-stone-950 hover:border-stone-950 dark:border-stone-700 dark:text-stone-50 dark:hover:border-stone-50"
            aria-label={`Increase ${item.title} quantity`}
          >
            +
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="ml-2 text-xs font-semibold uppercase tracking-wide text-stone-500 hover:text-stone-950 dark:hover:text-stone-50"
          >
            Remove
          </button>
        </div>
      </div>
      <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
        {currencyFormatter.format(item.price * item.quantity)}
      </p>
    </li>
  );
}
