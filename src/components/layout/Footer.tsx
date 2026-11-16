import { getFooter } from "@/sanity/content";
import Image from "next/image";
import Link from "next/link";
import { eurostileExtended, eurostileExtendedRegular } from "@/lib/fonts";

function safeHref(href: string | null | undefined) {
  if (!href) return "#";
  return /^(https?:|mailto:|tel:|\/(?!\/)|#)/i.test(href) ? href : "#";
}

export async function Footer() {
  const footer = await getFooter();
  return (
    <footer className={`${eurostileExtendedRegular.className} surfboard-line-grid bg-white dark:bg-stone-950`}>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[3fr_2fr] lg:px-8">
        <div className="flex flex-col items-start gap-6 md:flex-row">
          <Image
            src="/logos/IBD-Logo-outline-black.svg"
            alt="Ian Blackmore Designs"
            width={865}
            height={1010}
            className="h-20 w-auto shrink-0 dark:hidden"
          />
          <Image
            src={footer?.brandLogo?.url ?? "/logos/IBD-Logo-outline-white.svg"}
            alt={footer?.brandLogo?.alt ?? "Ian Blackmore Designs"}
            width={footer?.brandLogo?.dimensions?.width ?? 865}
            height={footer?.brandLogo?.dimensions?.height ?? 1010}
            className="hidden h-20 w-auto shrink-0 dark:block"
          />
          <div>
            <h2 className={`${eurostileExtended.className} text-base font-bold text-stone-950 dark:text-stone-50`}>
              {footer?.brandName ?? "IAN BLACKMORE DESIGNS"}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-stone-600 dark:text-stone-400">
              {footer?.description ?? "Custom surfboards shaped with a focus on feel, speed, and lasting connection to the water."}
            </p>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-[repeat(3,max-content)] sm:gap-12 md:justify-end">
          <div>
            <h2 className={`${eurostileExtended.className} text-sm font-bold text-stone-950 dark:text-stone-50`}>
              {footer?.shopHeading ?? "Shop"}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-stone-600 dark:text-stone-400">
              {(footer?.shopLinks ?? [{_key:"surfboards",label:"Surfboards",href:"/surfboards"},{_key:"custom",label:"Custom Orders",href:"/custom"}]).map((link) => (
                <li key={link._key}>
                  <Link href={safeHref(link.href)} className="hover:text-stone-950 dark:hover:text-stone-50">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={`${eurostileExtended.className} text-sm font-bold text-stone-950 dark:text-stone-50`}>
              {footer?.brandHeading ?? "Brand"}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-stone-600 dark:text-stone-400">
              {(footer?.brandLinks ?? [{_key:"about",label:"About",href:"/about"},{_key:"contact",label:"Contact",href:"/contact"}]).map((link) => (
                <li key={link._key}>
                  <Link href={safeHref(link.href)} className="hover:text-stone-950 dark:hover:text-stone-50">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={`${eurostileExtended.className} text-sm font-bold text-stone-950 dark:text-stone-50`}>
              {footer?.followHeading ?? "Follow"}
            </h2>
            <Link
              href={safeHref(footer?.instagramUrl ?? "https://www.instagram.com/ibdesigns.us/")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ian Blackmore Designs on Instagram"
              className="mt-4 inline-flex text-stone-600 transition-colors hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-50"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between md:col-span-2">
          <p>© {new Date().getFullYear()} {footer?.copyrightName ?? "Ian Blackmore Designs"}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {(footer?.legalLinks ?? [
              {_key: "privacy", label: "Privacy Policy", href: "/privacy-policy"},
              {_key: "accessibility", label: "Accessibility", href: "/accessibility"},
              {_key: "terms", label: "Terms & Conditions", href: "/terms-and-conditions"},
            ]).map((link) => (
              <Link key={link._key} href={safeHref(link.href)} className="transition-colors hover:text-stone-950 dark:hover:text-stone-50">{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
