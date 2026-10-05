import type { Metadata } from "next";
import { Button } from "@/components/common/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Ian Blackmore Designs and the shaping philosophy behind the boards.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="rounded-[2.5rem] bg-[linear-gradient(145deg,#292524,#78716c)] p-8 text-stone-50">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-300">
            About
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Built for feel first.
          </h1>
        </div>
        <div>
          <p className="text-lg leading-8 text-stone-600 dark:text-stone-300">
            Ian Blackmore Designs is represented here as a premium custom
            surfboard storefront, structured for brand storytelling now and
            Shopify-powered commerce later.
          </p>
          <p className="mt-6 text-lg leading-8 text-stone-600 dark:text-stone-300">
            Product content currently lives in local data with the same shape the
            storefront will expect from Shopify: handles, titles, prices, images,
            dimensions, availability, and variants.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="/surfboards">View Boards</Button>
            <Button href="/custom" variant="secondary">
              Custom Process
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
