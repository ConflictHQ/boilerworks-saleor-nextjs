"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";

interface CartDrawerProps {
  children: React.ReactNode;
}

export function CartDrawer({ children }: CartDrawerProps) {
  const t = useTranslations("cart");
  const [open, setOpen] = useState(false);
  const { lines, checkout, loading, updateQuantity, removeFromCart } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription className="sr-only">Your shopping cart contents</SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <p className="text-muted-foreground">{t("empty")}</p>
            <Button variant="outline" onClick={() => setOpen(false)} asChild>
              <Link href="/products">{t("continueShopping")}</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {lines.map(
                  (line: {
                    id: string;
                    quantity: number;
                    variant: {
                      id: string;
                      name: string;
                      product: { name: string; slug: string; thumbnail?: { url: string } };
                      pricing?: {
                        price?: { gross: { amount: number; currency: string } };
                      };
                    };
                    totalPrice?: { gross: { amount: number; currency: string } };
                  }) => (
                    <div key={line.id} className="flex gap-4">
                      <div className="bg-muted h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                        {line.variant.product.thumbnail?.url ? (
                          <Image
                            src={line.variant.product.thumbnail.url}
                            alt={line.variant.product.name}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="text-muted-foreground flex h-full w-full items-center justify-center text-xs">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <Link
                            href={`/products/${line.variant.product.slug}`}
                            className="hover:text-primary text-sm font-medium"
                            onClick={() => setOpen(false)}
                          >
                            {line.variant.product.name}
                          </Link>
                          {line.variant.name !== line.variant.product.name && (
                            <p className="text-muted-foreground text-xs">{line.variant.name}</p>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(line.id, line.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{line.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(line.id, line.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive h-7 w-7"
                              onClick={() => removeFromCart(line.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          {line.totalPrice && (
                            <span className="text-sm font-medium">
                              {formatPrice(
                                line.totalPrice.gross.amount,
                                line.totalPrice.gross.currency,
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              {checkout?.totalPrice && (
                <div className="mb-4 space-y-2">
                  {checkout.subtotalPrice && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("subtotal")}</span>
                      <span>
                        {formatPrice(
                          checkout.subtotalPrice.gross.amount,
                          checkout.subtotalPrice.gross.currency,
                        )}
                      </span>
                    </div>
                  )}
                  {checkout.shippingPrice && checkout.shippingPrice.gross.amount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("shipping")}</span>
                      <span>
                        {formatPrice(
                          checkout.shippingPrice.gross.amount,
                          checkout.shippingPrice.gross.currency,
                        )}
                      </span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>{t("total")}</span>
                    <span>
                      {formatPrice(
                        checkout.totalPrice.gross.amount,
                        checkout.totalPrice.gross.currency,
                      )}
                    </span>
                  </div>
                </div>
              )}
              <SheetFooter className="flex-col gap-2 sm:flex-col">
                <Button className="w-full" onClick={() => setOpen(false)} asChild>
                  <Link href="/checkout">{t("checkout")}</Link>
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setOpen(false)} asChild>
                  <Link href="/products">{t("continueShopping")}</Link>
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
