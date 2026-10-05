import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1fr_2fr] lg:px-8">
        <div>
          <Image
            src="/logos/IBD-Logo-thick-black.svg"
            alt="Ian Blackmore Designs"
            width={865}
            height={1010}
            className="h-24 w-auto dark:hidden"
          />
          <Image
            src="/logos/IBD-Logo-thick-white.svg"
            alt="Ian Blackmore Designs"
            width={865}
            height={1010}
            className="hidden h-24 w-auto dark:block"
          />
          <p className="mt-5 max-w-sm text-sm leading-6 text-stone-600 dark:text-stone-400">
            Custom surfboards shaped with a focus on feel, speed, and lasting
            connection to the water.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold text-stone-950 dark:text-stone-50">
              Shop
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/surfboards" className="hover:text-stone-950 dark:hover:text-stone-50">
                  Surfboards
                </Link>
              </li>
              <li>
                <Link href="/custom" className="hover:text-stone-950 dark:hover:text-stone-50">
                  Custom Orders
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-stone-950 dark:text-stone-50">
              Brand
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/about" className="hover:text-stone-950 dark:hover:text-stone-50">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-stone-950 dark:hover:text-stone-50">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-stone-950 dark:text-stone-50">
              Commerce
            </h2>
            <p className="mt-4 text-sm leading-6 text-stone-600 dark:text-stone-400">
              Shopify product, cart, checkout, and order flows will connect here later.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
