"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/common/Button";
import { CartItem, type CartLine } from "@/components/cart/CartItem";
import { eurostileExtended, eurostileRegular } from "@/lib/fonts";

const CART_EVENT = "ibd:add-to-cart";
const CART_CLEAR_EVENT = "ibd:clear-cart";
const CART_STORAGE_KEY = "ibd-cart-v1";
const MAX_LINE_QUANTITY = 10;

type CartEventDetail = {
  id: string;
  title: string;
  image: string;
  price: number;
  currency: string;
};

type CartDrawerProps = {
  onDarkBackground?: boolean;
};

export function CartDrawer({ onDarkBackground = false }: CartDrawerProps) {
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
    function handlePageShow() {
      setIsCheckingOut(false);
    }

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

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
                    image: detail.image,
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

      setIsCheckingOut(false);
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
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative inline-flex h-10 w-10 items-center justify-center text-stone-950 transition-colors hover:text-stone-500 dark:text-stone-50 dark:hover:text-stone-300"
        aria-label={`Open cart with ${itemCount} items`}
      >
        <Image
          src="/icons/cart.svg"
          alt=""
          width={37}
          height={21}
          className={`h-auto w-8 ${onDarkBackground ? "invert-0" : "invert dark:invert-0"}`}
          aria-hidden="true"
        />
        {itemCount > 0 ? (
          <span
            className={`absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none ${onDarkBackground ? "bg-white text-stone-950" : "bg-stone-950 text-white dark:bg-white dark:text-stone-950"}`}
            aria-hidden="true"
          >
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        ) : null}
      </button>

      {isOpen ? createPortal(
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Cart">
          <button
            type="button"
            className="absolute inset-0 bg-stone-950/40"
            aria-label="Close cart"
            onClick={() => setIsOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l-[0.5px] border-white bg-white p-6 shadow-2xl dark:bg-stone-950">
            <div className="flex items-center justify-between gap-4">
              <h2 className={`${eurostileExtended.className} text-xs font-bold uppercase leading-none tracking-[0.08em] text-stone-950 dark:text-stone-50 sm:text-base lg:text-lg`}>
                Cart
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-60"
                aria-label="Close cart"
              >
                <Image
                  src="/icons/close.svg"
                  alt=""
                  width={25}
                  height={26}
                  className="h-auto w-6 invert dark:invert-0"
                  aria-hidden="true"
                />
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
                  <div className={`${eurostileExtended.className} flex items-center justify-between text-base font-bold uppercase text-stone-950 dark:text-stone-50`}>
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
                    className={`${eurostileExtended.className} mt-5 w-full gap-2.5 font-bold uppercase disabled:cursor-wait disabled:opacity-60`}
                    disabled={isCheckingOut}
                    onClick={handleCheckout}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 shrink-0"
                      fill="none"
                      aria-hidden="true"
                    >
                      <rect x="2.5" y="2.5" width="19" height="19" rx="4" stroke="currentColor" strokeWidth="2.5" />
                      <rect x="8.25" y="8.25" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="2.5" />
                    </svg>
                    {isCheckingOut ? "Opening Square…" : "Checkout with Square"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <Image
                  src="/images/planar.png"
                  alt=""
                  width={5712}
                  height={4284}
                  className="mb-6 h-auto w-48 max-w-full object-contain"
                  aria-hidden="true"
                />
                <p className={`${eurostileExtended.className} text-lg font-bold uppercase text-stone-950 dark:text-stone-50`}>
                  Your cart is empty
                </p>
                <p className={`${eurostileRegular.className} mt-3 text-base leading-6 text-stone-500 dark:text-stone-400`}>
                  Add a surfboard to begin your order.
                </p>
                <Button
                  href="/surfboards"
                  className={`${eurostileExtended.className} mt-6 font-bold`}
                  onClick={() => setIsOpen(false)}
                >
                  View Boards
                </Button>
              </div>
            )}
          </aside>
        </div>,
        document.body,
      ) : null}
    </div>
  );
}

export { CART_CLEAR_EVENT, CART_EVENT, CART_STORAGE_KEY };
