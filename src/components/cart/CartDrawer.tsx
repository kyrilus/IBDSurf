"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { CartItem, type CartLine } from "@/components/cart/CartItem";

const CART_EVENT = "ibd:add-to-cart";

type CartEventDetail = {
  id: string;
  title: string;
  price: number;
  currency: string;
};

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);

  useEffect(() => {
    function handleAddToCart(event: Event) {
      const { detail } = event as CustomEvent<CartEventDetail>;

      setCart((currentCart) => {
        const existingItem = currentCart.find((item) => item.id === detail.id);
        const nextCart = existingItem
          ? currentCart.map((item) =>
              item.id === detail.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...currentCart, { ...detail, quantity: 1 }];

        return nextCart;
      });
      setIsOpen(true);
    }

    window.addEventListener(CART_EVENT, handleAddToCart);

    return () => {
      window.removeEventListener(CART_EVENT, handleAddToCart);
    };
  }, []);

  const itemCount = useMemo(
    () => cart.reduce((count, item) => count + item.quantity, 0),
    [cart],
  );

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-none border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-950 transition-colors hover:border-stone-950 dark:border-stone-700 dark:text-stone-50 dark:hover:border-stone-50"
        aria-label={`Open cart with ${itemCount} items`}
      >
        Cart ({itemCount})
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Cart">
          <button
            type="button"
            className="absolute inset-0 bg-stone-950/40"
            aria-label="Close cart"
            onClick={() => setIsOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white p-6 shadow-2xl dark:bg-stone-950">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
                  Placeholder Cart
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-stone-950 dark:text-stone-50">
                  Your Board Room
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-none border border-stone-300 px-3 py-1 text-sm text-stone-700 transition-colors hover:border-stone-950 hover:text-stone-950 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-50 dark:hover:text-stone-50"
              >
                Close
              </button>
            </div>

            {cart.length > 0 ? (
              <>
                <ul className="mt-8 flex-1 overflow-y-auto">
                  {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </ul>
                <div className="border-t border-stone-200 pt-6 dark:border-stone-800">
                  <div className="flex items-center justify-between text-base font-semibold text-stone-950 dark:text-stone-50">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString("en-US")}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-500 dark:text-stone-400">
                    Checkout will be connected through Shopify later.
                  </p>
                  <Button type="button" className="mt-5 w-full" disabled>
                    Checkout Coming Soon
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-start justify-center">
                <p className="text-lg font-medium text-stone-950 dark:text-stone-50">
                  Your cart is empty.
                </p>
                <p className="mt-3 text-sm leading-6 text-stone-500 dark:text-stone-400">
                  Add a board to preview the future Shopify cart experience.
                </p>
                <Button href="/surfboards" className="mt-6" onClick={() => setIsOpen(false)}>
                  View Boards
                </Button>
              </div>
            )}
          </aside>
        </div>
      ) : null}
    </div>
  );
}

export { CART_EVENT };
