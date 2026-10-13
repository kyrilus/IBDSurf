import type { Metadata } from "next";
import { CustomBoardRequestForm } from "@/components/custom/CustomBoardRequestForm";
import { eurostileExtended } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Custom Surfboards",
  description:
    "Start a custom Ian Blackmore Designs surfboard inquiry shaped around your waves, style, and goals.",
};

export default function CustomPage() {
  return (
    <div className="surfboard-line-grid bg-white dark:bg-stone-950">
      <section className="flex min-h-[24svh] items-center justify-center bg-transparent px-6 py-12 text-center lg:px-8">
        <h1 className={`${eurostileExtended.className} text-2xl font-bold leading-none tracking-[0.08em] text-stone-950 dark:text-white sm:text-3xl lg:text-4xl`}>
          CUSTOM BOARD ORDER
        </h1>
      </section>
      <section>
        <CustomBoardRequestForm />
      </section>
    </div>
  );
}
