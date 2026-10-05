// Shopify Storefront API GraphQL documents.
// Product fields are selected to normalize into src/data/boards.ts.
// Dimensions are expected as product metafields under namespace "custom".

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment BoardProduct on Product {
    id
    handle
    title
    description
    availableForSale
    tags
    featuredImage {
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    length: metafield(namespace: "custom", key: "length") {
      value
    }
    width: metafield(namespace: "custom", key: "width") {
      value
    }
    thickness: metafield(namespace: "custom", key: "thickness") {
      value
    }
    volume: metafield(namespace: "custom", key: "volume") {
      value
    }
    featured: metafield(namespace: "custom", key: "featured") {
      value
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
        }
      }
    }
  }
`;

export const PRODUCTS_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}

  query Products($first: Int = 100, $after: String) {
    products(first: $first, after: $after, sortKey: TITLE) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...BoardProduct
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}

  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...BoardProduct
    }
  }
`;

export const COLLECTIONS_QUERY = /* GraphQL */ `
  query Collections($first: Int = 20) {
    collections(first: $first, sortKey: TITLE) {
      edges {
        node {
          id
          handle
          title
          description
        }
      }
    }
  }
`;

export const CREATE_CART_MUTATION = /* GraphQL */ `
  mutation CreateCart($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const ADD_CART_LINES_MUTATION = /* GraphQL */ `
  mutation AddCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const UPDATE_CART_LINES_MUTATION = /* GraphQL */ `
  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const REMOVE_CART_LINES_MUTATION = /* GraphQL */ `
  mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;
