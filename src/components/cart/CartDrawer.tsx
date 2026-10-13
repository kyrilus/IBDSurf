"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { CartItem, type CartLine } from "@/components/cart/CartItem";

const CART_EVENT = "ibd:add-to-cart";
const CART_CLEAR_EVENT = "ibd:clear-cart";
const CART_STORAGE_KEY = "ibd-cart-v1";
const MAX_LINE_QUANTITY = 10;

type CartEventDetail = {
  id: string;
  title: string;
  price: number;
  currency: string;
};

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [hasLoadedCart, setHasLoadedCart] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart) as CartLine[];
          if (Array.isArray(parsedCart)) {
            setCart(
              parsedCart.filter(
                (item) =>
                  typeof item.id === "string" &&
                  typeof item.title === "string" &&
                  typeof item.price === "number" &&
                  typeof item.currency === "string" &&
                  Number.isInteger(item.quantity) &&
                  item.quantity > 0,
              ),
            );
          }
        }
      } catch {
        window.localStorage.removeItem(CART_STORAGE_KEY);
      } finally {
        setHasLoadedCart(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hasLoadedCart) {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, hasLoadedCart]);

  useEffect(() => {
    function handleAddToCart(event: Event) {
      const { detail } = event as CustomEvent<CartEventDetail>;

      setCart((currentCart) => {
        const existingItem = currentCart.find((item) => item.id === detail.id);
        const nextCart = existingItem
          ? currentCart.map((item) =>
              item.id === detail.id
                ? {
                    ...item,
                    quantity: Math.min(item.quantity + 1, MAX_LINE_QUANTITY),
                  }
                : item,
            )
          : [...currentCart, { ...detail, quantity: 1 }];

        return nextCart;
      });
      setCheckoutError(null);
      setIsOpen(true);
    }

    function handleClearCart() {
      setCart([]);
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }

    window.addEventListener(CART_EVENT, handleAddToCart);
    window.addEventListener(CART_CLEAR_EVENT, handleClearCart);

    return () => {
      window.removeEventListener(CART_EVENT, handleAddToCart);
      window.removeEventListener(CART_CLEAR_EVENT, handleClearCart);
    };
  }, []);

  function updateQuantity(id: string, quantity: number) {
    setCheckoutError(null);
    setCart((currentCart) =>
      quantity < 1
        ? currentCart.filter((item) => item.id !== id)
        : currentCart.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.min(quantity, MAX_LINE_QUANTITY) }
              : item,
          ),
    );
  }

  function removeItem(id: string) {
    setCheckoutError(null);
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  }

  async function handleCheckout() {
    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: cart.map((item) => ({
            variationId: item.id,
            quantity: item.quantity,
          })),
        }),
      });
      const body = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (!response.ok || !body.checkoutUrl) {
        throw new Error(body.error || "Unable to start checkout.");
      }

      window.location.assign(body.checkoutUrl);
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? error.message
          : "Unable to start checkout. Please try again.",
      );
      setIsCheckingOut(false);
    }
  }

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
                  Shopping Cart
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
                    <CartItem
                      key={item.id}
                      item={item}
                      onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                      onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}
                </ul>
                <div className="border-t border-stone-200 pt-6 dark:border-stone-800">
                  <div className="flex items-center justify-between text-base font-semibold text-stone-950 dark:text-stone-50">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString("en-US")}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-500 dark:text-stone-400">
                    Taxes and shipping are calculated securely by Square.
                  </p>
                  {checkoutError ? (
                    <p className="mt-3 text-sm text-red-700 dark:text-red-400" role="alert">
                      {checkoutError}
                    </p>
                  ) : null}
                  <Button
                    type="button"
                    className="mt-5 w-full disabled:cursor-wait disabled:opacity-60"
                    disabled={isCheckingOut}
                    onClick={handleCheckout}
                  >
                    {isCheckingOut ? "Opening Square…" : "Checkout with Square"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-start justify-center">
                <p className="text-lg font-medium text-stone-950 dark:text-stone-50">
                  Your cart is empty.
                </p>
                <p className="mt-3 text-sm leading-6 text-stone-500 dark:text-stone-400">
                  Add a surfboard to begin your order.
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

export { CART_CLEAR_EVENT, CART_EVENT, CART_STORAGE_KEY };
