export type CartLine = {
  id: string;
  title: string;
  quantity: number;
  price: number;
  currency: string;
};

type CartItemProps = {
  item: CartLine;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function CartItem({ item }: CartItemProps) {
  return (
    <li className="flex items-start justify-between gap-4 border-b border-stone-200 py-4 last:border-b-0 dark:border-stone-800">
      <div>
        <p className="font-medium text-stone-950 dark:text-stone-50">{item.title}</p>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Quantity: {item.quantity}
        </p>
      </div>
      <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
        {currencyFormatter.format(item.price * item.quantity)}
      </p>
    </li>
  );
}
