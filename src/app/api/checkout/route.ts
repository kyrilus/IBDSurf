import { SquareError } from "square";
import {
  createSquareCheckout,
  SquareCheckoutValidationError,
  type SquareCheckoutLine,
} from "@/lib/square";

const MAX_CART_LINES = 20;
const MAX_LINE_QUANTITY = 10;

function parseLines(body: unknown): SquareCheckoutLine[] {
  if (!body || typeof body !== "object" || !("lines" in body)) {
    throw new SquareCheckoutValidationError("Your cart is empty.");
  }

  const { lines } = body;
  if (!Array.isArray(lines) || lines.length === 0) {
    throw new SquareCheckoutValidationError("Your cart is empty.");
  }

  if (lines.length > MAX_CART_LINES) {
    throw new SquareCheckoutValidationError("Your cart contains too many items.");
  }

  const quantities = new Map<string, number>();

  for (const line of lines) {
    if (
      !line ||
      typeof line !== "object" ||
      !("variationId" in line) ||
      !("quantity" in line) ||
      typeof line.variationId !== "string" ||
      !line.variationId ||
      typeof line.quantity !== "number" ||
      !Number.isInteger(line.quantity) ||
      line.quantity < 1 ||
      line.quantity > MAX_LINE_QUANTITY
    ) {
      throw new SquareCheckoutValidationError("The cart contains an invalid item.");
    }

    quantities.set(
      line.variationId,
      (quantities.get(line.variationId) ?? 0) + line.quantity,
    );
  }

  return Array.from(quantities, ([variationId, quantity]) => {
    if (quantity > MAX_LINE_QUANTITY) {
      throw new SquareCheckoutValidationError(
        "The quantity for a cart item is too large.",
      );
    }

    return { variationId, quantity };
  });
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const lines = parseLines(body);
    const checkoutUrl = await createSquareCheckout(lines);

    return Response.json({ checkoutUrl });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (error instanceof SquareCheckoutValidationError) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof SquareError) {
      console.error("Square checkout failed", error.errors);
    } else {
      console.error("Checkout failed", error);
    }

    return Response.json(
      { error: "Checkout is temporarily unavailable. Please try again." },
      { status: 502 },
    );
  }
}
