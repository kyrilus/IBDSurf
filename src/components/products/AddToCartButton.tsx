"use client";

import { CART_EVENT } from "@/components/cart/CartDrawer";
import { Button } from "@/components/common/Button";

type AddToCartButtonProps = {
  id: string;
  title: string;
  price: number;
  currency: string;
  available: boolean;
};

export function AddToCartButton({
  id,
  title,
  price,
  currency,
  available,
}: AddToCartButtonProps) {
  function handleAddToCart() {
    window.dispatchEvent(
      new CustomEvent(CART_EVENT, {
        detail: { id, title, price, currency },
      }),
    );
  }

  return (
    <Button type="button" onClick={handleAddToCart} disabled={!available}>
      {available ? "Add to Cart" : "Unavailable"}
    </Button>
  );
}
