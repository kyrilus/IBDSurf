# Ian Blackmore Designs

A custom surfboard storefront built with [Next.js](https://nextjs.org), the App Router, React, TypeScript, and Tailwind CSS.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
