"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const t = useTranslations("cart");
  const { lines, checkout, loading, updateQuantity, removeFromCart } = useCart();

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">{t("title")}</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-foreground">{t("title")}</h1>

      {lines.length === 0 ? (
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground">{t("empty")}</p>
          <Button asChild>
            <Link href="/products">{t("continueShopping")}</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {lines.map(
              (line: {
                id: string;
                quantity: number;
                variant: {
                  id: string;
                  name: string;
                  product: { name: string; slug: string; thumbnail?: { url: string } };
                };
                totalPrice?: { gross: { amount: number; currency: string } };
              }) => (
                <div key={line.id} className="flex gap-4 rounded-lg border p-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    {line.variant.product.thumbnail?.url ? (
                      <Image
                        src={line.variant.product.thumbnail.url}
                        alt={line.variant.product.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        href={`/products/${line.variant.product.slug}`}
                        className="font-medium hover:text-primary"
                      >
                        {line.variant.product.name}
                      </Link>
                      {line.variant.name !== line.variant.product.name && (
                        <p className="text-sm text-muted-foreground">{line.variant.name}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(line.id, line.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{line.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeFromCart(line.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {line.totalPrice && (
                        <span className="font-medium">
                          {formatPrice(line.totalPrice.gross.amount, line.totalPrice.gross.currency)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="text-lg font-semibold">{t("subtotal")}</h2>
            {checkout?.subtotalPrice && (
              <p className="mt-2 text-2xl font-bold">
                {formatPrice(
                  checkout.subtotalPrice.gross.amount,
                  checkout.subtotalPrice.gross.currency,
                )}
              </p>
            )}
            <Separator className="my-4" />
            <Button className="w-full" asChild>
              <Link href="/checkout">{t("checkout")}</Link>
            </Button>
            <Button variant="outline" className="mt-2 w-full" asChild>
              <Link href="/products">{t("continueShopping")}</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
