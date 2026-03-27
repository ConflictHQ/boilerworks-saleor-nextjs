// ---------------------------------------------------------------------------
// Category types -- extended tree structure with background images
// ---------------------------------------------------------------------------

import type { PageInfo } from "../products/products.types";

export interface CategoryTreeNode {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  backgroundImage: {
    url: string;
    alt: string | null;
  } | null;
  parent: {
    id: string;
    name: string;
    slug: string;
  } | null;
  children: {
    edges: Array<{ node: CategoryTreeNode }>;
    pageInfo: PageInfo;
  } | null;
  level: number;
}

// Re-export the product-domain Category type for convenience
export type {
  Category,
  GetCategoriesData,
  GetCategoriesVariables,
  GetCategoryBySlugData,
  GetCategoryBySlugVariables,
} from "../products/products.types";
