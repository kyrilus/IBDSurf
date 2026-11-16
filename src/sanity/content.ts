import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";
import { HOME_PAGE_QUERY, ABOUT_PAGE_QUERY, CONTACT_PAGE_QUERY, FOOTER_QUERY, HEADER_QUERY, MENU_QUERY, SHOPPING_CART_QUERY, BOARDS_PAGE_QUERY, CUSTOM_PAGE_QUERY } from "./queries";

// These marketing pages refresh published content at most every 60 seconds.
// Keep the existing page content available if the CMS is unreachable.
async function fetchPage<const Q extends string>(query: Q) {
  try {
    return await client.fetch(query, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Unable to load Sanity page content", error);
    return null;
  }
}

// Visibility controls should reflect published changes on the next refresh.
// Bypass both the Sanity CDN and Next's persistent cache for Home settings.
export const getHomePage = cache(async () => {
  await connection();
  try {
    return await client.withConfig({ useCdn: false }).fetch(
      HOME_PAGE_QUERY,
      {},
      { cache: "no-store" },
    );
  } catch (error) {
    console.error("Unable to load Sanity Home settings", error);
    return null;
  }
});
export const getAboutPage = cache(() => fetchPage(ABOUT_PAGE_QUERY));
export const getContactPage = cache(() => fetchPage(CONTACT_PAGE_QUERY));

const builder = createImageUrlBuilder(client);
export function pageImage(image: SanityImageSource | null | undefined, fallback: string) {
  return image ? builder.image(image).width(1920).auto("format").url() : fallback;
}

export const getFooter = cache(() => fetchPage(FOOTER_QUERY));

export const getHeader = cache(() => fetchPage(HEADER_QUERY));
export const getMenu = cache(() => fetchPage(MENU_QUERY));
export const getShoppingCart = cache(() => fetchPage(SHOPPING_CART_QUERY));

export const getBoardsPage = cache(() => fetchPage(BOARDS_PAGE_QUERY));

export const getCustomPage = cache(() => fetchPage(CUSTOM_PAGE_QUERY));
