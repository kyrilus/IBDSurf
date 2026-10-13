"use client";

import { CART_EVENT } from "@/components/cart/CartDrawer";
import { Button } from "@/components/common/Button";
import { eurostileExtended } from "@/lib/fonts";

type AddToCartButtonProps = {
  id: string;
  title: string;
  image: string;
  price: number;
  currency: string;
  available: boolean;
};

export function AddToCartButton({
  id,
  title,
  image,
  price,
  currency,
  available,
}: AddToCartButtonProps) {
  function handleAddToCart() {
    window.dispatchEvent(
      new CustomEvent(CART_EVENT, {
        detail: { id, title, image, price, currency },
      }),
    );
  }

  return (
    <Button
      type="button"
      onClick={handleAddToCart}
      disabled={!available}
      className={`${eurostileExtended.className} h-14 px-8 text-base font-bold uppercase`}
    >
      {available ? "Add to Cart" : "Unavailable"}
    </Button>
  );
}
