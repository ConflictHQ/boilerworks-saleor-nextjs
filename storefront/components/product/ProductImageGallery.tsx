"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImage {
  url: string;
  alt?: string | null;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg bg-muted">
        <p className="text-muted-foreground">No image available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg bg-muted">
        <Image
          src={images[selectedIndex].url}
          alt={images[selectedIndex].alt ?? productName}
          width={600}
          height={600}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                index === selectedIndex ? "border-primary" : "border-transparent",
              )}
            >
              <Image
                src={image.url}
                alt={image.alt ?? `${productName} ${index + 1}`}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
