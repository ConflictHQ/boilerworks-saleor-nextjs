import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  name: string;
  slug: string;
  thumbnail?: { url: string; alt?: string } | null;
  pricing?: {
    priceRange?: {
      start?: { gross: { amount: number; currency: string } } | null;
      stop?: { gross: { amount: number; currency: string } } | null;
    } | null;
  } | null;
  category?: { name: string; slug: string } | null;
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
