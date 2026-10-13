"use client";

import { useEffect } from "react";
import { Button } from "@/components/common/Button";
import {
  CART_CLEAR_EVENT,
  CART_STORAGE_KEY,
} from "@/components/cart/CartDrawer";

export default function CheckoutSuccessPage() {
  useEffect(() => {
    window.localStorage.removeItem(CART_STORAGE_KEY);
    window.dispatchEvent(new Event(CART_CLEAR_EVENT));
  }, []);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
        Payment received
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
        Thank you for your order.
      </h1>
      <p className="mt-6 max-w-xl leading-8 text-stone-600 dark:text-stone-300">
        Square has processed your checkout. You will receive your receipt and order
        details using the contact information provided at checkout.
      </p>
      <Button href="/surfboards" className="mt-8">
        Continue Shopping
      </Button>
    </div>
  );
}
