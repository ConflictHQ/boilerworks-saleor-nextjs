import { getClient } from "@/lib/apollo/client";
import { SEARCH_PRODUCTS } from "@/graphql/products/products.queries";
import { DEFAULT_CHANNEL, PRODUCTS_PER_PAGE } from "@/lib/constants";
import { ProductGrid } from "@/components/product/ProductGrid";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Search",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let products: any[] = [];
  if (query.trim()) {
    const { data } = await getClient().query<any>({
      query: SEARCH_PRODUCTS,
      variables: {
        channel: DEFAULT_CHANNEL,
        first: PRODUCTS_PER_PAGE,
        query: query.trim(),
      },
    });
    products =
      data?.products?.edges?.map((edge: { node: any }) => edge.node) ?? [];
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          {query ? `Results for "${query}"` : "Search"}
        </h1>
        {query && (
          <p className="mt-2 text-muted-foreground">
            {products.length} product{products.length !== 1 ? "s" : ""} found
          </p>
        )}
      </div>
      {query ? (
        <ProductGrid products={products} />
      ) : (
        <p className="text-muted-foreground">Enter a search term to find products.</p>
      )}
    </div>
  );
}
