import type { Metadata } from "next";
import Image from "next/image";
import { eurostileExtended, eurostileRegular } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ian Blackmore Designs about custom surfboards, board availability, and future orders.",
};

export default function ContactPage() {
  return (
    <div className="surfboard-line-grid bg-white dark:bg-stone-950">
      <section className="flex min-h-[24svh] items-center justify-center bg-transparent px-6 py-12 text-center lg:px-8">
        <h1 data-admin-text="contact.heading" className={`${eurostileExtended.className} text-2xl font-bold leading-none tracking-[0.08em] text-stone-950 dark:text-white sm:text-3xl lg:text-4xl`}>
          CONTACT IBD
        </h1>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:pb-32">
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[3/2] lg:aspect-[4/5]">
          <Image
            src="/images/hero/board-noses.png"
            data-admin-image="contact.image"
            alt="Ian Blackmore Designs contact"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="max-w-2xl">
          <p data-admin-text="contact.eyebrow" className={`${eurostileExtended.className} text-sm font-bold uppercase tracking-[0.08em] text-stone-500`}>
            Get In Touch
          </p>
          <h2 data-admin-text="contact.title" className={`${eurostileExtended.className} mt-4 text-3xl font-bold uppercase leading-tight text-stone-950 dark:text-white sm:text-4xl`}>
            Start A Conversation
          </h2>
          <p data-admin-text="contact.body" className={`${eurostileRegular.className} mt-6 text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg`}>
            Placeholder copy for general questions, available boards, collaborations,
            or anything else related to Ian Blackmore Designs.
          </p>

          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <dt className={`${eurostileExtended.className} text-xs font-bold uppercase tracking-[0.08em] text-stone-500`}>
                Email
              </dt>
              <dd className={`${eurostileRegular.className} mt-3 text-lg text-stone-950 dark:text-white`}>
                <a data-admin-text="contact.email" href="mailto:ian@ibdesigns.us" className="underline underline-offset-4">
                  ian@ibdesigns.us
                </a>
              </dd>
            </div>
            <div>
              <dt className={`${eurostileExtended.className} text-xs font-bold uppercase tracking-[0.08em] text-stone-500`}>
                Phone
              </dt>
              <dd data-admin-text="contact.phone" className={`${eurostileRegular.className} mt-3 text-lg text-stone-600 dark:text-stone-300`}>
                Phone Placeholder
              </dd>
            </div>
            <div>
              <dt className={`${eurostileExtended.className} text-xs font-bold uppercase tracking-[0.08em] text-stone-500`}>
                Studio
              </dt>
              <dd data-admin-text="contact.studio" className={`${eurostileRegular.className} mt-3 text-lg text-stone-600 dark:text-stone-300`}>
                Location Placeholder
              </dd>
            </div>
            <div>
              <dt className={`${eurostileExtended.className} text-xs font-bold uppercase tracking-[0.08em] text-stone-500`}>
                Instagram
              </dt>
              <dd data-admin-text="contact.instagram" className={`${eurostileRegular.className} mt-3 text-lg text-stone-600 dark:text-stone-300`}>
                Instagram Placeholder
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
