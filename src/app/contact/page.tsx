import type { Metadata } from "next";
import { Button } from "@/components/common/Button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ian Blackmore Designs about custom surfboards, board availability, and future orders.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
        Contact
      </p>
      <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
        Start the conversation.
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-300">
        Use this page for inquiries until Shopify customer, cart, and checkout
        flows are connected.
      </p>

      <section className="mt-12 rounded-[2rem] border border-stone-200 bg-white p-8 dark:border-stone-800 dark:bg-stone-950">
        <h2 className="text-2xl font-semibold text-stone-950 dark:text-stone-50">
          Custom board inquiries
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-stone-600 dark:text-stone-400">
          Include your height, weight, ability level, typical waves, current board
          references, and what you want the next board to do differently.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button href="mailto:hello@ianblackmoredesigns.com">
            Email Inquiry
          </Button>
          <Button href="/surfboards" variant="secondary">
            Browse Boards
          </Button>
        </div>
      </section>
    </div>
  );
}
