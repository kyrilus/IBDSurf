import { unstable_cache } from "next/cache";
import {
  ArchivedState,
  CatalogItemProductType,
  InventoryState,
  Square,
  SquareClient,
  SquareEnvironment,
} from "square";
import { boards as fallbackBoards, type Board, type BoardVariant } from "@/data/boards";

const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
const SQUARE_ENVIRONMENT = process.env.SQUARE_ENVIRONMENT?.toLowerCase();
const CATALOG_CACHE_SECONDS = 60;

type SquareCatalogItem = Square.CatalogObject.Item;
type SquareCatalogVariation = Square.CatalogObject.ItemVariation;

export function isSquareConfigured() {
  return Boolean(SQUARE_ACCESS_TOKEN && SQUARE_LOCATION_ID);
}

function getSquareClient() {
  if (!SQUARE_ACCESS_TOKEN) {
    throw new Error("Missing SQUARE_ACCESS_TOKEN.");
  }

  if (SQUARE_ENVIRONMENT !== "production" && SQUARE_ENVIRONMENT !== "sandbox") {
    throw new Error('SQUARE_ENVIRONMENT must be either "production" or "sandbox".');
  }

  return new SquareClient({
    token: SQUARE_ACCESS_TOKEN,
    environment:
      SQUARE_ENVIRONMENT === "sandbox"
        ? SquareEnvironment.Sandbox
        : SquareEnvironment.Production,
  });
}

function getLocationId() {
  if (!SQUARE_LOCATION_ID) {
    throw new Error("Missing SQUARE_LOCATION_ID.");
  }

  return SQUARE_LOCATION_ID;
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCustomAttribute(
  object: SquareCatalogItem | SquareCatalogVariation,
  key: string,
) {
  const attributes = object.customAttributeValues ?? {};
  const entry = Object.entries(attributes).find(
    ([attributeKey, value]) =>
      attributeKey === key ||
      attributeKey.endsWith(`:${key}`) ||
      value.key === key ||
      value.key?.endsWith(`:${key}`),
  );

  return entry?.[1];
}

function getCustomString(
  object: SquareCatalogItem | SquareCatalogVariation,
  key: string,
) {
  const attribute = getCustomAttribute(object, key);
  return attribute?.stringValue ?? attribute?.numberValue ?? undefined;
}

function getCustomBoolean(
  object: SquareCatalogItem | SquareCatalogVariation,
  key: string,
) {
  return getCustomAttribute(object, key)?.booleanValue ?? false;
}

function isPresentAtLocation(
  object: SquareCatalogItem | SquareCatalogVariation,
  locationId: string,
) {
  if (object.absentAtLocationIds?.includes(locationId)) return false;
  if (object.presentAtAllLocations !== false) return true;
  return object.presentAtLocationIds?.includes(locationId) ?? false;
}

function getLocationOverride(variation: SquareCatalogVariation, locationId: string) {
  return variation.itemVariationData?.locationOverrides?.find(
    (override) => override.locationId === locationId,
  );
}

function isInventoryTracked(variation: SquareCatalogVariation, locationId: string) {
  const override = getLocationOverride(variation, locationId);
  return override?.trackInventory ?? variation.itemVariationData?.trackInventory ?? false;
}

function getVariationPrice(variation: SquareCatalogVariation, locationId: string) {
  const data = variation.itemVariationData;
  const money = getLocationOverride(variation, locationId)?.priceMoney ?? data?.priceMoney;
  const amount = money?.amount;

  return {
    price: amount == null ? 0 : Number(amount) / 100,
    currency: money?.currency ?? "USD",
  };
}

async function searchCatalogItems() {
  const client = getSquareClient();
  const locationId = getLocationId();
  const items: SquareCatalogItem[] = [];
  let cursor: string | undefined;

  do {
    const response = await client.catalog.searchItems({
      archivedState: ArchivedState.ArchivedStateNotArchived,
      enabledLocationIds: [locationId],
      productTypes: [CatalogItemProductType.Regular],
      limit: 100,
      cursor,
    });

    for (const object of response.items ?? []) {
      if (object.type === "ITEM" && object.itemData && !object.itemData.isArchived) {
        items.push(object);
      }
    }

    cursor = response.cursor;
  } while (cursor);

  return items;
}

function getItemVariations(item: SquareCatalogItem, locationId: string) {
  return (item.itemData?.variations ?? []).filter(
    (variation): variation is SquareCatalogVariation =>
      variation.type === "ITEM_VARIATION" &&
      Boolean(variation.itemVariationData) &&
      !variation.isDeleted &&
      isPresentAtLocation(variation, locationId) &&
      variation.itemVariationData?.sellable !== false,
  );
}

async function getInventoryByVariation(variationIds: string[]) {
  const inventory = new Map<string, number>();
  if (variationIds.length === 0) return inventory;

  const client = getSquareClient();
  const page = await client.inventory.batchGetCounts({
    catalogObjectIds: variationIds,
    locationIds: [getLocationId()],
    states: [InventoryState.InStock],
    limit: 1000,
  });

  for await (const count of page) {
    if (count.catalogObjectId) {
      inventory.set(count.catalogObjectId, Number(count.quantity ?? 0));
    }
  }

  return inventory;
}

async function getImagesById(imageIds: string[]) {
  const images = new Map<string, string>();
  if (imageIds.length === 0) return images;

  const client = getSquareClient();

  for (let index = 0; index < imageIds.length; index += 1000) {
    const response = await client.catalog.batchGet({
      objectIds: imageIds.slice(index, index + 1000),
    });

    for (const object of response.objects ?? []) {
      if (object.type === "IMAGE" && object.imageData?.url) {
        images.set(object.id, object.imageData.url);
      }
    }
  }

  return images;
}

function getImageId(item: SquareCatalogItem, variation: SquareCatalogVariation) {
  return (
    variation.itemVariationData?.imageIds?.[0] ??
    variation.imageId ??
    item.itemData?.imageIds?.[0] ??
    item.imageId
  );
}

function isVariationAvailable(
  variation: SquareCatalogVariation,
  inventory: Map<string, number>,
  locationId: string,
) {
  const override = getLocationOverride(variation, locationId);
  if (override?.soldOut) return false;

  return isInventoryTracked(variation, locationId)
    ? (inventory.get(variation.id) ?? 0) > 0
    : true;
}

function normalizeVariants(
  variations: SquareCatalogVariation[],
  inventory: Map<string, number>,
  locationId: string,
): BoardVariant[] {
  return variations.map((variation) => ({
    id: variation.id,
    title: variation.itemVariationData?.name || "Regular",
    available: isVariationAvailable(variation, inventory, locationId),
  }));
}

function normalizeItem(
  item: SquareCatalogItem,
  variations: SquareCatalogVariation[],
  inventory: Map<string, number>,
  images: Map<string, string>,
  locationId: string,
): Board | undefined {
  const title = item.itemData?.name?.trim();
  if (!title || variations.length === 0) return undefined;

  const normalizedVariants = normalizeVariants(variations, inventory, locationId);
  const primaryIndex = Math.max(
    normalizedVariants.findIndex((variation) => variation.available),
    0,
  );
  const primaryVariation = variations[primaryIndex];
  const price = getVariationPrice(primaryVariation, locationId);
  const imageId = getImageId(item, primaryVariation);
  const customSlug = getCustomString(item, "website_slug")?.trim();

  return {
    // A cart line must reference a sellable Square variation, not its parent item.
    id: primaryVariation.id,
    handle: slugify(customSlug || title),
    title,
    price: price.price,
    currency: price.currency,
    description:
      item.itemData?.descriptionPlaintext ?? item.itemData?.description ?? "",
    dimensions: {
      length: getCustomString(item, "length") ?? "Custom",
      width: getCustomString(item, "width") ?? "Custom",
      thickness: getCustomString(item, "thickness") ?? "Custom",
      volume: getCustomString(item, "volume"),
    },
    image: (imageId && images.get(imageId)) || "/images/placeholders/twin-fin.svg",
    available: normalizedVariants.some((variation) => variation.available),
    featured: getCustomBoolean(item, "featured"),
    tags: [],
    variants: normalizedVariants,
  };
}

async function fetchSquareProducts(): Promise<Board[]> {
  const items = await searchCatalogItems();
  const locationId = getLocationId();
  const variationsByItem = new Map<string, SquareCatalogVariation[]>();

  for (const item of items) {
    variationsByItem.set(item.id, getItemVariations(item, locationId));
  }

  const variations = [...variationsByItem.values()].flat();
  const inventory = await getInventoryByVariation(
    variations.map((variation) => variation.id),
  );
  const imageIds = Array.from(
    new Set(
      items.flatMap((item) =>
        (variationsByItem.get(item.id) ?? [])
          .map((variation) => getImageId(item, variation))
          .filter((id): id is string => Boolean(id)),
      ),
    ),
  );
  const images = await getImagesById(imageIds);

  return items
    .map((item) =>
      normalizeItem(
        item,
        variationsByItem.get(item.id) ?? [],
        inventory,
        images,
        locationId,
      ),
    )
    .filter((board): board is Board => Boolean(board));
}

const getCachedSquareProducts = unstable_cache(
  fetchSquareProducts,
  ["square-products"],
  {
    revalidate: CATALOG_CACHE_SECONDS,
    tags: ["square-catalog"],
  },
);

export async function getProducts(): Promise<Board[]> {
  if (!isSquareConfigured()) return fallbackBoards;
  return getCachedSquareProducts();
}

export async function getProductByHandle(handle: string): Promise<Board | undefined> {
  const products = await getProducts();
  return products.find((product) => product.handle === handle);
}
