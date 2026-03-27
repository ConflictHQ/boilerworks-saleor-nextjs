import { gql } from "@apollo/client";

// ---------------------------------------------------------------------------
// Fragments
// ---------------------------------------------------------------------------

const PRODUCT_PRICING_FRAGMENT = gql`
  fragment ProductPricingFields on Product {
    pricing {
      onSale
      discount {
        gross {
          amount
          currency
        }
      }
      priceRange {
        start {
          gross {
            amount
            currency
          }
          net {
            amount
            currency
          }
        }
        stop {
          gross {
            amount
            currency
          }
          net {
            amount
            currency
          }
        }
      }
      priceRangeUndiscounted {
        start {
          gross {
            amount
            currency
          }
        }
        stop {
          gross {
            amount
            currency
          }
        }
      }
    }
  }
`;

const PRODUCT_VARIANT_FRAGMENT = gql`
  fragment ProductVariantFields on ProductVariant {
    id
    name
    sku
    quantityAvailable
    pricing {
      onSale
      price {
        gross {
          amount
          currency
        }
        net {
          amount
          currency
        }
      }
      priceUndiscounted {
        gross {
          amount
          currency
        }
      }
    }
    attributes {
      attribute {
        id
        name
        slug
      }
      values {
        name
        value
        slug
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export const GET_PRODUCTS = gql`
  ${PRODUCT_PRICING_FRAGMENT}
  query GetProducts(
    $channel: String!
    $first: Int = 12
    $after: String
    $filter: ProductFilterInput
    $sortBy: ProductOrder
  ) {
    products(channel: $channel, first: $first, after: $after, filter: $filter, sortBy: $sortBy) {
      edges {
        cursor
        node {
          id
          name
          slug
          thumbnail {
            url
            alt
          }
          ...ProductPricingFields
          category {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  ${PRODUCT_PRICING_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  query GetProductBySlug($slug: String!, $channel: String!) {
    product(slug: $slug, channel: $channel) {
      id
      name
      slug
      description
      seoTitle
      seoDescription
      thumbnail {
        url
        alt
      }
      images {
        id
        url
        alt
        sortOrder
      }
      ...ProductPricingFields
      variants {
        ...ProductVariantFields
      }
      category {
        id
        name
        slug
      }
      collections {
        id
        name
        slug
      }
      attributes {
        attribute {
          id
          name
          slug
        }
        values {
          name
          value
          slug
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories($first: Int = 100) {
    categories(first: $first, level: 0) {
      edges {
        node {
          id
          name
          slug
          description
          backgroundImage {
            url
            alt
          }
          children(first: 100) {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_CATEGORY_BY_SLUG = gql`
  ${PRODUCT_PRICING_FRAGMENT}
  query GetCategoryBySlug($slug: String!, $channel: String!, $first: Int = 12, $after: String) {
    category(slug: $slug) {
      id
      name
      slug
      description
      backgroundImage {
        url
        alt
      }
      parent {
        id
        name
        slug
      }
      children(first: 100) {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
      products(channel: $channel, first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            name
            slug
            thumbnail {
              url
              alt
            }
            ...ProductPricingFields
            category {
              id
              name
              slug
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  }
`;

export const GET_COLLECTIONS = gql`
  query GetCollections($channel: String!, $first: Int = 100) {
    collections(channel: $channel, first: $first) {
      edges {
        node {
          id
          name
          slug
          description
          backgroundImage {
            url
            alt
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_COLLECTION_BY_SLUG = gql`
  ${PRODUCT_PRICING_FRAGMENT}
  query GetCollectionBySlug($slug: String!, $channel: String!, $first: Int = 12, $after: String) {
    collection(slug: $slug, channel: $channel) {
      id
      name
      slug
      description
      backgroundImage {
        url
        alt
      }
      products(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            name
            slug
            thumbnail {
              url
              alt
            }
            ...ProductPricingFields
            category {
              id
              name
              slug
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  ${PRODUCT_PRICING_FRAGMENT}
  query SearchProducts($channel: String!, $first: Int = 12, $query: String!) {
    products(channel: $channel, first: $first, filter: { search: $query }) {
      edges {
        cursor
        node {
          id
          name
          slug
          thumbnail {
            url
            alt
          }
          ...ProductPricingFields
          category {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;
