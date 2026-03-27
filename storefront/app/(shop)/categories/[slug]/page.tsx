import { notFound } from "next/navigation";
import { getClient } from "@/lib/apollo/client";
import { GET_CATEGORY_BY_SLUG } from "@/graphql/products/products.queries";
import { DEFAULT_CHANNEL, PRODUCTS_PER_PAGE } from "@/lib/constants";
import { ProductGrid } from "@/components/product/ProductGrid";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const { data } = await getClient().query<any>({
    query: GET_CATEGORY_BY_SLUG,
    variables: { slug, channel: DEFAULT_CHANNEL, first: 1 },
  });

  const category = data?.category;
  if (!category) return { title: "Category Not Found" };
  return { title: category.name };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const { data } = await getClient().query<any>({
    query: GET_CATEGORY_BY_SLUG,
    variables: { slug, channel: DEFAULT_CHANNEL, first: PRODUCTS_PER_PAGE },
  });

  const category = data?.category;
  if (!category) notFound();

  const products =
    category.products?.edges?.map((edge: { node: Record<string, unknown> }) => edge.node) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-muted-foreground">{category.description}</p>
        )}
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
