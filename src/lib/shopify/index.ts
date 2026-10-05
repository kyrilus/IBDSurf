import { boards as fallbackBoards, type Board, type BoardVariant } from "@/data/boards";
import {
  ADD_CART_LINES_MUTATION,
  COLLECTIONS_QUERY,
  CREATE_CART_MUTATION,
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
  REMOVE_CART_LINES_MUTATION,
  UPDATE_CART_LINES_MUTATION,
} from "@/lib/shopify/queries";

const SHOPIFY_API_VERSION = "2026-01";
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

type ShopifyMetafield = {
  value: string;
} | null;

type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
};

type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  tags: string[];
  featuredImage: ShopifyImage | null;
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  length: ShopifyMetafield;
  width: ShopifyMetafield;
  thickness: ShopifyMetafield;
  volume: ShopifyMetafield;
  featured: ShopifyMetafield;
  variants: {
    edges: Array<{
      node: ShopifyVariant;
    }>;
  };
};

type ProductsResponse = {
  products: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
};

type ProductByHandleResponse = {
  product: ShopifyProduct | null;
};

type CollectionsResponse = {
  collections: {
    edges: Array<{
      node: {
        id: string;
        handle: string;
        title: string;
        description: string;
      };
    }>;
  };
};

type ShopifyResponse<T> = {
  data?: T;
  errors?: Array<{
    message: string;
  }>;
};

type ShopifyCartLineInput = {
  merchandiseId: string;
  quantity: number;
};

type ShopifyCartLineUpdateInput = {
  id: string;
  merchandiseId?: string;
  quantity?: number;
};

export function isShopifyConfigured() {
  return Boolean(SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

function getShopifyEndpoint() {
  if (!SHOPIFY_STORE_DOMAIN) {
    throw new Error("Missing SHOPIFY_STORE_DOMAIN.");
  }

  return `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
}

async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}) {
  if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN.");
  }

  const response = await fetch(getShopifyEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(`Shopify request failed with status ${response.status}.`);
  }

  const body = (await response.json()) as ShopifyResponse<T>;

  if (body.errors?.length) {
    throw new Error(body.errors.map((error) => error.message).join("; "));
  }

  if (!body.data) {
    throw new Error("Shopify response did not include data.");
  }

  return body.data;
}

function parseFeaturedFlag(featured: ShopifyMetafield) {
  return featured?.value === "true";
}

function normalizeVariants(product: ShopifyProduct): BoardVariant[] {
  return product.variants.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    available: node.availableForSale,
  }));
}

function normalizeProduct(product: ShopifyProduct): Board {
  const price = Number(product.priceRange.minVariantPrice.amount);

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    price: Number.isNaN(price) ? 0 : price,
    currency: product.priceRange.minVariantPrice.currencyCode,
    description: product.description,
    dimensions: {
      length: product.length?.value ?? "Custom",
      width: product.width?.value ?? "Custom",
      thickness: product.thickness?.value ?? "Custom",
      volume: product.volume?.value,
    },
    image: product.featuredImage?.url ?? "/images/placeholders/twin-fin.svg",
    available: product.availableForSale,
    featured: parseFeaturedFlag(product.featured),
    tags: product.tags,
    variants: normalizeVariants(product),
  };
}

export async function getProducts(): Promise<Board[]> {
  if (!isShopifyConfigured()) {
    return fallbackBoards;
  }

  const boards: Board[] = [];
  let after: string | null = null;

  while (true) {
    const data: ProductsResponse = await shopifyFetch<ProductsResponse>({
      query: PRODUCTS_QUERY,
      variables: { first: 100, after },
    });

    boards.push(...data.products.edges.map(({ node }) => normalizeProduct(node)));
    const { hasNextPage, endCursor } = data.products.pageInfo;
    if (!hasNextPage) break;
    if (!endCursor || endCursor === after) {
      throw new Error("Shopify returned an invalid product pagination cursor.");
    }
    after = endCursor;
  }

  return boards;
}

export async function getProductByHandle(handle: string): Promise<Board | undefined> {
  if (!isShopifyConfigured()) {
    return fallbackBoards.find((board) => board.handle === handle);
  }

  const data = await shopifyFetch<ProductByHandleResponse>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: {
      handle,
    },
  });

  return data.product ? normalizeProduct(data.product) : undefined;
}

export async function getCollections() {
  if (!isShopifyConfigured()) {
    return [];
  }

  const data = await shopifyFetch<CollectionsResponse>({
    query: COLLECTIONS_QUERY,
    variables: {
      first: 20,
    },
  });

  return data.collections.edges.map(({ node }) => node);
}

export async function createCart(lines?: ShopifyCartLineInput[]) {
  return shopifyFetch({
    query: CREATE_CART_MUTATION,
    variables: {
      lines,
    },
  });
}

export async function addCartLines(cartId: string, lines: ShopifyCartLineInput[]) {
  return shopifyFetch({
    query: ADD_CART_LINES_MUTATION,
    variables: {
      cartId,
      lines,
    },
  });
}

export async function updateCartLines(
  cartId: string,
  lines: ShopifyCartLineUpdateInput[],
) {
  return shopifyFetch({
    query: UPDATE_CART_LINES_MUTATION,
    variables: {
      cartId,
      lines,
    },
  });
}

export async function removeCartLines(cartId: string, lineIds: string[]) {
  return shopifyFetch({
    query: REMOVE_CART_LINES_MUTATION,
    variables: {
      cartId,
      lineIds,
    },
  });
}
