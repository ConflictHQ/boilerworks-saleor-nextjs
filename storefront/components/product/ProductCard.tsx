"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: {
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
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const startPrice = product.pricing?.priceRange?.start?.gross;
  const stopPrice = product.pricing?.priceRange?.stop?.gross;
  const hasRange =
    startPrice && stopPrice && startPrice.amount !== stopPrice.amount;

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
        <div className="aspect-square overflow-hidden bg-muted">
          {product.thumbnail?.url ? (
            <Image
              src={product.thumbnail.url}
              alt={product.thumbnail.alt ?? product.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>
        <CardContent className="p-4">
          {product.category && (
            <p className="mb-1 text-xs text-muted-foreground">{product.category.name}</p>
          )}
          <h3 className="text-sm font-medium leading-tight text-foreground group-hover:text-primary">
            {product.name}
          </h3>
          {startPrice && (
            <p className="mt-2 text-sm font-semibold text-foreground">
              {hasRange
                ? `${formatPrice(startPrice.amount, startPrice.currency)} – ${formatPrice(stopPrice.amount, stopPrice.currency)}`
                : formatPrice(startPrice.amount, startPrice.currency)}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
