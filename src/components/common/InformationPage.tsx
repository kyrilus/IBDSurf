import type { ReactNode } from "react";
import { eurostileExtended, eurostileRegular } from "@/lib/fonts";

export function InformationPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="surfboard-line-grid bg-white dark:bg-stone-950">
      <header className="flex min-h-[24svh] items-center justify-center px-6 py-12 text-center lg:px-8">
        <h1 className={`${eurostileExtended.className} text-2xl font-bold uppercase leading-tight tracking-[0.08em] text-stone-950 dark:text-white sm:text-3xl lg:text-4xl`}>{title}</h1>
      </header>
      <article className={`${eurostileRegular.className} mx-auto max-w-3xl space-y-10 px-6 pb-24 text-base leading-8 text-stone-600 dark:text-stone-300 lg:px-8 lg:pb-32 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-stone-950 dark:[&_h2]:text-white [&_a]:underline [&_a]:underline-offset-4`}>
        {children}
      </article>
    </div>
  );
}
