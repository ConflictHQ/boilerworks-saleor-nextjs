// ---------------------------------------------------------------------------
// Category queries -- re-exported from products module
//
// Categories are queried via the products domain since Saleor ties them
// together. This file provides a convenient import path for consumers
// that think in terms of categories rather than products.
// ---------------------------------------------------------------------------

export { GET_CATEGORIES, GET_CATEGORY_BY_SLUG } from "../products/products.queries";

export { useCategories, useCategoryBySlug } from "../products/products.hooks";
