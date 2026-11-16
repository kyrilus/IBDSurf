# Ian Blackmore Designs

A custom surfboard storefront built with [Next.js](https://nextjs.org), the App Router, React, TypeScript, and Tailwind CSS.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Sanity content management

The nine editors use native tabs with practical field descriptions. General is first on standard pages. Page background color controls have been removed. The existing background image controls and original page styles remain; any previously stored color values are retained as hidden legacy data and ignored by the website.

See [the complete CMS audit and field map](docs/sanity-cms-organization.md) for every tab, field, rename, default, and verification result. Studio display metadata lives in `../studio-ibdesigns/schemaTypes/editorLayouts.ts`; existing stored field definitions remain in their original schema files. Run `npm run cms:check` for schema-preservation, page-output/SEO, background, and commerce-boundary regression checks.


The standalone Studio remains in `../studio-ibdesigns`, connected to project `6c7ljryt` and dataset `production`.

```bash
npm run sanity:dev
```

Open http://localhost:3333 to edit Home, About, Contact, Boards, Custom, Footer, Header, Menu, and Shopping Cart. The Footer editor controls brand copy, section headings, navigation links, Instagram, copyright name, and legal links; its current content is prefilled as a draft. Publish changes in Studio; the website refreshes published content within about 60 seconds. Existing page copy is retained as a fallback if Sanity is unavailable. Square continues to manage products and checkout.

Header controls desktop/mobile brand text and logos for light and dark backgrounds. Menu controls link labels, destinations, and ordering. Shopping Cart controls drawer copy, empty-cart artwork and browse link, and checkout labels. These editors are prefilled as drafts; publish edits to display them on the website. Square remains responsible for product data and checkout.

Boards controls the /surfboards heading, SEO, filter visibility and labels, category button order/modes, price ranges, the custom-order card, and the empty-results message. Category modes are All, Available (Square inventory), and Custom orders; product prices and availability remain in Square. Price ranges have inclusive minimums and exclusive maximums. Hiding filters displays the unfiltered catalog.

Custom keeps the page heading/background above three expanded, collapsible sections: Custom Request Form (fields and submit button text), Side Modal (contact email and sidebar text), and SEO. Submit settings use top-level fields with legacy formCopy fallbacks to preserve older content. Its Form fields list supports adding, removing, and reordering text, email, phone, number, long-text, and dropdown inputs. Each has a label, placeholder, required toggle, optional choices, and a full-width toggle. The form retains two columns on larger screens and stacks on mobile. Only the displayed fields are included in inquiry emails; an empty field list displays no inputs. It is prefilled as a draft; publish to apply changes. The request form opens the customer’s email app for review and sending.

`src/sanity/queries.ts` contains the content queries, and `src/sanity/types.ts` is generated from the Studio schema. After changing schemas or queries, run:

```bash
npm run sanity:typegen
```

The public project ID and dataset are documented in `.env.example`. Public published reads need no API token. Never put write tokens in `NEXT_PUBLIC_` variables.

The initial content import script is idempotent and preserves existing documents. From the Studio folder, run `npx sanity exec ../ian-blackmore-designs/scripts/seed-sanity.cjs --with-user-token` only when restoring missing initial content. It creates drafts and does not publish them.

## Storefront Architecture

- `src/app` contains App Router pages for `/`, `/surfboards`, `/surfboards/[handle]`, `/custom`, `/about`, and `/contact`.
- `src/components` contains reusable layout, product, cart, and common UI components.
- `src/data/boards.ts` contains temporary surfboard data shaped to be replaceable with Shopify product data.
- `src/lib/shopify` contains Storefront API queries, server-side fetch helpers, product normalization, and local fallback behavior when Shopify env vars are empty.
- `public/logos` stores permanent Ian Blackmore Designs logo assets.
- `public/images` stores website photography and temporary placeholders.

## Shopify Integration Plan

Next.js remains the customer-facing storefront and controls the brand experience, routing, rendering, and reusable UI components.

Shopify will serve as the commerce backend. Product and collection data will eventually come from Shopify's Storefront API, while Shopify manages inventory, pricing, discounts, shipping, checkout, orders, and payments.

The intended data flow is:

```text
Shopify
  -> src/lib/shopify/
  -> Next.js Server Components / server-side data fetching
  -> BoardGrid / BoardCard / BoardDetails
  -> Customer
```

Shopify's Cart API will eventually replace the temporary client-side cart placeholder. Shopify product images will eventually come from Shopify's CDN; when the image hostname is known, set `SHOPIFY_IMAGE_HOSTNAME` so `next.config.ts` can add it to `images.remotePatterns`.

API credentials should be stored securely using environment variables such as `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN`. Prefer server-side Shopify requests where practical, and do not expose private Storefront credentials with `NEXT_PUBLIC_` unless a value is explicitly safe for browser use.

The current Shopify normalizer expects optional product metafields in the `custom` namespace:

- `length`
- `width`
- `thickness`
- `volume`
- `featured`

## Environment Variables

Copy `.env.example` to a local environment file when Shopify integration begins:

```bash
SHOPIFY_STORE_DOMAIN=
SHOPIFY_STOREFRONT_ACCESS_TOKEN=
SHOPIFY_IMAGE_HOSTNAME=
```

Real `.env` files are ignored by Git.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Deploy with any Next.js-compatible host, including Vercel.
