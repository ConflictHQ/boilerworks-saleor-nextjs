"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { VariantSelector } from "@/components/product/VariantSelector";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";

interface Variant {
  id: string;
  name: string;
  sku: string;
  quantityAvailable: number;
  attributes: {
    attribute: { name: string; slug: string };
    values: { name: string; value?: string | null }[];
  }[];
  pricing?: {
    price?: { gross: { amount: number; currency: string } };
  } | null;
}

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    images: { url: string; alt?: string | null }[];
    variants: Variant[];
    category?: { id: string; name: string; slug: string } | null;
    collections?: { id: string; name: string; slug: string }[];
  };
}

export function ProductDetail({ product }: ProductDetailProps) {
  const t = useTranslations("product");
  const { addToCart } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    product.variants[0]?.id ?? null,
  );
  const [adding, setAdding] = useState(false);

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId);
  const isAvailable = selectedVariant ? selectedVariant.quantityAvailable > 0 : false;
  const price = selectedVariant?.pricing?.price?.gross;

  const handleAddToCart = async () => {
    if (!selectedVariantId) return;
    setAdding(true);
    try {
      await addToCart(selectedVariantId);
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  let description: string | null = null;
  if (product.description) {
    try {
      const parsed = JSON.parse(product.description);
      description =
        parsed?.blocks
          ?.map((block: { data?: { text?: string } }) => block.data?.text)
          .filter(Boolean)
          .join("\n\n") ?? null;
    } catch {
      description = product.description;
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <ProductImageGallery images={product.images} productName={product.name} />

      <div className="space-y-6">
        {product.category && (
          <Badge variant="secondary">{product.category.name}</Badge>
        )}

        <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>

        {price && (
          <p className="text-2xl font-semibold text-foreground">
            {formatPrice(price.amount, price.currency)}
          </p>
        )}

        <Separator />

        <VariantSelector
          variants={product.variants}
          selectedVariantId={selectedVariantId}
          onSelect={setSelectedVariantId}
        />

        <Button
          size="lg"
          className="w-full"
          disabled={!isAvailable || adding}
          onClick={handleAddToCart}
        >
          {adding ? "Adding..." : isAvailable ? t("addToCart") : t("outOfStock")}
        </Button>

        {description && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">{t("description")}</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert">
              {description.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {selectedVariant && selectedVariant.attributes.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">{t("specifications")}</h2>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              {selectedVariant.attributes.map((attr) => (
                <div key={attr.attribute.slug}>
                  <dt className="text-muted-foreground">{attr.attribute.name}</dt>
                  <dd className="font-medium">{attr.values.map((v) => v.name).join(", ")}</dd>
                </div>
              ))}
              {selectedVariant.sku && (
                <div>
                  <dt className="text-muted-foreground">SKU</dt>
                  <dd className="font-medium">{selectedVariant.sku}</dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
