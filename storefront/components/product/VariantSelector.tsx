"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Attribute {
  attribute: { name: string; slug: string };
  values: { name: string; value?: string | null }[];
}

interface Variant {
  id: string;
  name: string;
  quantityAvailable: number;
  attributes: Attribute[];
  pricing?: {
    price?: { gross: { amount: number; currency: string } };
  } | null;
}

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariantId: string | null;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({ variants, selectedVariantId, onSelect }: VariantSelectorProps) {
  if (variants.length <= 1) return null;

  const attributeGroups = new Map<string, Set<string>>();
  for (const variant of variants) {
    for (const attr of variant.attributes) {
      if (!attributeGroups.has(attr.attribute.slug)) {
        attributeGroups.set(attr.attribute.slug, new Set());
      }
      for (const val of attr.values) {
        attributeGroups.get(attr.attribute.slug)!.add(val.name);
      }
    }
  }

  return (
    <div className="space-y-4">
      {variants.map((variant) => {
        const isSelected = variant.id === selectedVariantId;
        const isAvailable = variant.quantityAvailable > 0;

        return (
          <Button
            key={variant.id}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            disabled={!isAvailable}
            onClick={() => onSelect(variant.id)}
            className={cn(!isAvailable && "opacity-50")}
          >
            {variant.name}
            {!isAvailable && " (Out of stock)"}
          </Button>
        );
      })}
    </div>
  );
}
