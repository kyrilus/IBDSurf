import type { Metadata } from "next";
import { Button } from "@/components/common/Button";

export const metadata: Metadata = {
  title: "Custom Surfboards",
  description:
    "Start a custom Ian Blackmore Designs surfboard inquiry shaped around your waves, style, and goals.",
};

export default function CustomPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
        Custom Orders
      </p>
      <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
        A board shaped around the way you surf.
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-300">
        This page is ready to become the custom inquiry and product configuration
        path. For now, it introduces the process without connecting Shopify.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {["Conversation", "Design", "Shape"].map((step, index) => (
          <section
            key={step}
            className="rounded-[2rem] border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-950"
          >
            <p className="text-sm font-semibold text-stone-500">0{index + 1}</p>
            <h2 className="mt-4 text-xl font-semibold text-stone-950 dark:text-stone-50">
              {step}
            </h2>
            <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
              Share your goals, refine the dimensions and outline, then move into
              a custom build when the details feel right.
            </p>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] bg-stone-950 p-8 text-stone-50">
        <h2 className="text-2xl font-semibold">Ready to talk through a board?</h2>
        <p className="mt-3 max-w-2xl text-stone-300">
          Contact details and inquiry forms can later connect to Shopify customer
          or draft order workflows.
        </p>
        <Button href="/contact" className="mt-6" variant="secondary">
          Contact Ian
        </Button>
      </div>
    </div>
  );
}
