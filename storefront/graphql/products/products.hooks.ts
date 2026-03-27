"use client";

import { useQuery } from "@apollo/client/react";
import { DEFAULT_CHANNEL } from "@/lib/constants";
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_SLUG,
  GET_CATEGORIES,
  GET_CATEGORY_BY_SLUG,
  GET_COLLECTIONS,
  GET_COLLECTION_BY_SLUG,
  SEARCH_PRODUCTS,
} from "./products.queries";
import type {
  GetProductsData,
  GetProductsVariables,
  GetProductBySlugData,
  GetProductBySlugVariables,
  GetCategoriesData,
  GetCategoriesVariables,
  GetCategoryBySlugData,
  GetCategoryBySlugVariables,
  GetCollectionsData,
  GetCollectionsVariables,
  GetCollectionBySlugData,
  GetCollectionBySlugVariables,
  SearchProductsData,
  SearchProductsVariables,
  ProductFilterInput,
  ProductOrder,
} from "./products.types";

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export interface UseProductsOptions {
  first?: number;
  after?: string | null;
  filter?: ProductFilterInput;
  sortBy?: ProductOrder;
  skip?: boolean;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const { first, after, filter, sortBy, skip } = options;

  return useQuery<GetProductsData, GetProductsVariables>(GET_PRODUCTS, {
    variables: {
      channel: DEFAULT_CHANNEL,
      first,
      after,
      filter,
      sortBy,
    },
    fetchPolicy: "cache-and-network",
    skip,
  });
};

// ---------------------------------------------------------------------------
// Single product by slug
// ---------------------------------------------------------------------------

export const useProductBySlug = (slug: string) => {
  return useQuery<GetProductBySlugData, GetProductBySlugVariables>(
    GET_PRODUCT_BY_SLUG,
    {
      variables: {
        slug,
        channel: DEFAULT_CHANNEL,
      },
      fetchPolicy: "cache-and-network",
      skip: !slug,
    },
  );
};

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export const useCategories = () => {
  return useQuery<GetCategoriesData, GetCategoriesVariables>(GET_CATEGORIES, {
    variables: {
      channel: DEFAULT_CHANNEL,
    },
    fetchPolicy: "cache-and-network",
  });
};

export const useCategoryBySlug = (slug: string) => {
  return useQuery<GetCategoryBySlugData, GetCategoryBySlugVariables>(
    GET_CATEGORY_BY_SLUG,
    {
      variables: {
        slug,
        channel: DEFAULT_CHANNEL,
      },
      fetchPolicy: "cache-and-network",
      skip: !slug,
    },
  );
};

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

export const useCollections = () => {
  return useQuery<GetCollectionsData, GetCollectionsVariables>(
    GET_COLLECTIONS,
    {
      variables: {
        channel: DEFAULT_CHANNEL,
      },
      fetchPolicy: "cache-and-network",
    },
  );
};

export const useCollectionBySlug = (slug: string) => {
  return useQuery<GetCollectionBySlugData, GetCollectionBySlugVariables>(
    GET_COLLECTION_BY_SLUG,
    {
      variables: {
        slug,
        channel: DEFAULT_CHANNEL,
      },
      fetchPolicy: "cache-and-network",
      skip: !slug,
    },
  );
};

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

export const useSearchProducts = (query: string) => {
  return useQuery<SearchProductsData, SearchProductsVariables>(
    SEARCH_PRODUCTS,
    {
      variables: {
        channel: DEFAULT_CHANNEL,
        query,
      },
      fetchPolicy: "cache-and-network",
      skip: !query,
    },
  );
};
