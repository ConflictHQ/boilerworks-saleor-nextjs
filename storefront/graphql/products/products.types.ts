// ---------------------------------------------------------------------------
// Product GraphQL types -- Saleor 3.x Relay-style
// ---------------------------------------------------------------------------

export interface Money {
  amount: number;
  currency: string;
}

export interface TaxedMoney {
  gross: Money;
  net: Money;
  tax: Money;
}

export interface TaxedMoneyRange {
  start: TaxedMoney | null;
  stop: TaxedMoney | null;
}

export interface ProductPricing {
  onSale: boolean;
  priceRange: TaxedMoneyRange | null;
  priceRangeUndiscounted: TaxedMoneyRange | null;
  discount: TaxedMoney | null;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  sortOrder: number | null;
}

export interface Thumbnail {
  url: string;
  alt: string | null;
}

export interface AttributeValue {
  name: string;
  value: string;
  slug: string;
}

export interface ProductAttribute {
  attribute: {
    id: string;
    name: string;
    slug: string;
  };
  values: AttributeValue[];
}

export interface VariantPricing {
  price: TaxedMoney | null;
  priceUndiscounted: TaxedMoney | null;
  onSale: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string | null;
  pricing: VariantPricing | null;
  quantityAvailable: number | null;
  attributes: ProductAttribute[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  backgroundImage: {
    url: string;
    alt: string | null;
  } | null;
  parent: Category | null;
  children: {
    edges: Array<{ node: Category }>;
  } | null;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  backgroundImage: {
    url: string;
    alt: string | null;
  } | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  thumbnail: Thumbnail | null;
  images: ProductImage[];
  pricing: ProductPricing | null;
  variants: ProductVariant[];
  category: Category | null;
  collections: Collection[] | null;
  attributes: ProductAttribute[];
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface ProductCountableEdge {
  node: Product;
  cursor: string;
}

export interface ProductCountableConnection {
  edges: ProductCountableEdge[];
  pageInfo: PageInfo;
  totalCount: number | null;
}

// ---------------------------------------------------------------------------
// Query variable types
// ---------------------------------------------------------------------------

export interface ProductFilterInput {
  search?: string;
  categories?: string[];
  collections?: string[];
  price?: {
    gte?: number;
    lte?: number;
  };
  isPublished?: boolean;
  stockAvailability?: "IN_STOCK" | "OUT_OF_STOCK";
}

export enum ProductOrderField {
  NAME = "NAME",
  PRICE = "PRICE",
  MINIMAL_PRICE = "MINIMAL_PRICE",
  DATE = "DATE",
  TYPE = "TYPE",
  PUBLISHED = "PUBLISHED",
  PUBLICATION_DATE = "PUBLICATION_DATE",
  RANK = "RANK",
  RATING = "RATING",
}

export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export interface ProductOrder {
  field: ProductOrderField;
  direction: OrderDirection;
}

export interface GetProductsVariables {
  channel: string;
  first?: number;
  after?: string | null;
  filter?: ProductFilterInput;
  sortBy?: ProductOrder;
}

export interface GetProductBySlugVariables {
  slug: string;
  channel: string;
}

export interface GetCategoriesVariables {
  channel: string;
  first?: number;
}

export interface GetCategoryBySlugVariables {
  slug: string;
  channel: string;
  first?: number;
  after?: string | null;
}

export interface GetCollectionsVariables {
  channel: string;
  first?: number;
}

export interface GetCollectionBySlugVariables {
  slug: string;
  channel: string;
  first?: number;
  after?: string | null;
}

export interface SearchProductsVariables {
  channel: string;
  first?: number;
  query: string;
}

// ---------------------------------------------------------------------------
// Query response types
// ---------------------------------------------------------------------------

export interface GetProductsData {
  products: ProductCountableConnection;
}

export interface GetProductBySlugData {
  product: Product | null;
}

export interface GetCategoriesData {
  categories: {
    edges: Array<{ node: Category }>;
    pageInfo: PageInfo;
  };
}

export interface GetCategoryBySlugData {
  category:
    | (Category & {
        products: ProductCountableConnection;
      })
    | null;
}

export interface GetCollectionsData {
  collections: {
    edges: Array<{ node: Collection }>;
    pageInfo: PageInfo;
  };
}

export interface GetCollectionBySlugData {
  collection:
    | (Collection & {
        products: ProductCountableConnection;
      })
    | null;
}

export interface SearchProductsData {
  products: ProductCountableConnection;
}
