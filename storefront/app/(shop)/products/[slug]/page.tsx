import { notFound } from "next/navigation";
import { getClient } from "@/lib/apollo/client";
import { GET_PRODUCT_BY_SLUG } from "@/graphql/products/products.queries";
import { DEFAULT_CHANNEL } from "@/lib/constants";
import { ProductDetail } from "./ProductDetail";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const { data } = await getClient().query<any>({
    query: GET_PRODUCT_BY_SLUG,
    variables: { slug, channel: DEFAULT_CHANNEL },
  });

  const product = data?.product;
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.seoDescription ?? product.name,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const { data } = await getClient().query<any>({
    query: GET_PRODUCT_BY_SLUG,
    variables: { slug, channel: DEFAULT_CHANNEL },
  });

  const product = data?.product;
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ProductDetail product={product} />
    </div>
  );
}
