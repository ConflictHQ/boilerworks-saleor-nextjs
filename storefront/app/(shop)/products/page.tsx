import { getClient } from "@/lib/apollo/client";
import { GET_PRODUCTS } from "@/graphql/products/products.queries";
import { DEFAULT_CHANNEL, PRODUCTS_PER_PAGE } from "@/lib/constants";
import { ProductGrid } from "@/components/product/ProductGrid";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Products",
};

interface ProductsPageProps {
  searchParams: Promise<{ page?: string; sort?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1", 10);
  const after = page > 1 ? btoa(`arrayconnection:${(page - 1) * PRODUCTS_PER_PAGE - 1}`) : null;

  const { data } = await getClient().query<any>({
    query: GET_PRODUCTS,
    variables: {
      channel: DEFAULT_CHANNEL,
      first: PRODUCTS_PER_PAGE,
      after,
      sortBy: { field: "NAME", direction: "ASC" },
    },
  });

  const products =
    data?.products?.edges?.map((edge: { node: Record<string, unknown> }) => edge.node) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-foreground text-3xl font-bold">Products</h1>
        <p className="text-muted-foreground mt-2">Browse our full catalog</p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
