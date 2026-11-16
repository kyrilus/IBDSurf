import { PortableText } from "next-sanity";
import { getContactPage, pageImage } from "@/sanity/content";
import type { Metadata } from "next";
import Image from "next/image";
import { eurostileExtended, eurostileRegular } from "@/lib/fonts";

const fallbackMetadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ian Blackmore Designs about custom surfboards, board availability, and future orders.",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return {title: page?.seo?.title ?? fallbackMetadata.title, description: page?.seo?.description ?? fallbackMetadata.description};
}

export default async function ContactPage() {
  const page = await getContactPage();
  return (
    <div className="surfboard-line-grid bg-white dark:bg-stone-950">
      <section className="flex min-h-[24svh] items-center justify-center bg-transparent px-6 py-12 text-center lg:px-8">
        <h1 className={`${eurostileExtended.className} text-2xl font-bold leading-none tracking-[0.08em] text-stone-950 dark:text-white sm:text-3xl lg:text-4xl`}>
          {page?.title ?? "CONTACT IBD"}
        </h1>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:pb-32">
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[3/2] lg:aspect-[4/5]">
          <Image
            src={pageImage(page?.image, "/images/hero/board-noses.png")}
            alt={page?.image?.alt ?? "Ian Blackmore Designs contact"}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="max-w-2xl">
          {(page?.showEyebrow ?? true) && (
          <p className={`${eurostileExtended.className} text-sm font-bold uppercase tracking-[0.08em] text-stone-500`}>
            {page?.eyebrow ?? "Get In Touch"}
          </p>
          )}
          {(page?.showHeading ?? true) && (
          <h2 className={`${eurostileExtended.className} ${(page?.showEyebrow ?? true) ? "mt-4" : ""} text-3xl font-bold uppercase leading-tight text-stone-950 dark:text-white sm:text-4xl`}>
            {page?.heading ?? "Start A Conversation"}
          </h2>
          )}
          <div className={`${eurostileRegular.className} mt-6 space-y-6 text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg`}>
            {page?.body?.length ? <PortableText value={page.body} /> : <p>Placeholder copy for general questions, available boards, collaborations,
            or anything else related to Ian Blackmore Designs.</p>}
          </div>

          {([page?.showEmail, page?.showPhone, page?.showAddress, page?.showInstagram].some(value => value ?? true)) && <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            {(page?.showEmail ?? true) && (
            <div>
              <dt className={`${eurostileExtended.className} text-xs font-bold uppercase tracking-[0.08em] text-stone-500`}>
                Email
              </dt>
              <dd className={`${eurostileRegular.className} mt-3 text-lg text-stone-950 dark:text-white`}>
                <a href={`mailto:${page?.email ?? "ian@ibdesigns.us"}`} className="underline underline-offset-4">
                  {page?.email ?? "ian@ibdesigns.us"}
                </a>
              </dd>
            </div>
            )}
            {(page?.showPhone ?? true) && (
            <div>
              <dt className={`${eurostileExtended.className} text-xs font-bold uppercase tracking-[0.08em] text-stone-500`}>
                Phone
              </dt>
              <dd className={`${eurostileRegular.className} mt-3 text-lg text-stone-600 dark:text-stone-300`}>
                {page?.phone ?? "Phone Placeholder"}
              </dd>
            </div>
            )}
            {(page?.showAddress ?? true) && (
            <div>
              <dt className={`${eurostileExtended.className} text-xs font-bold uppercase tracking-[0.08em] text-stone-500`}>
                Address
              </dt>
              <dd className={`${eurostileRegular.className} mt-3 text-lg text-stone-600 dark:text-stone-300`}>
                {page?.location ?? "Location Placeholder"}
              </dd>
            </div>
            )}
            {(page?.showInstagram ?? true) && (
            <div>
              <dt className={`${eurostileExtended.className} text-xs font-bold uppercase tracking-[0.08em] text-stone-500`}>
                Instagram
              </dt>
              <dd className={`${eurostileRegular.className} mt-3 text-lg text-stone-600 dark:text-stone-300`}>
                {page?.instagramUrl ? <a href={page.instagramUrl} className="underline underline-offset-4">Instagram</a> : "Instagram Placeholder"}
              </dd>
            </div>
            )}
          </dl>}
        </div>
      </section>
    </div>
  );
}
