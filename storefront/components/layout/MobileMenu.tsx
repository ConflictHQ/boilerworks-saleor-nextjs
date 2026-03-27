"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Menu, StoreIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export function MobileMenu() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <Link
              href="/"
              className="text-primary flex items-center gap-2 text-lg font-bold"
              onClick={() => setOpen(false)}
            >
              <StoreIcon className="h-5 w-5" />
              Boilerworks
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-4">
          <Link
            href="/products"
            className="text-foreground text-base font-medium"
            onClick={() => setOpen(false)}
          >
            {t("products")}
          </Link>
          <Link
            href="/categories"
            className="text-foreground text-base font-medium"
            onClick={() => setOpen(false)}
          >
            {t("categories")}
          </Link>
          <Link
            href="/collections"
            className="text-foreground text-base font-medium"
            onClick={() => setOpen(false)}
          >
            {t("collections")}
          </Link>

          <Separator />

          <Link
            href="/account"
            className="text-foreground text-base font-medium"
            onClick={() => setOpen(false)}
          >
            {t("account")}
          </Link>
          <Link
            href="/account/orders"
            className="text-muted-foreground text-base font-medium"
            onClick={() => setOpen(false)}
          >
            {t("orders")}
          </Link>
          <Link
            href="/cart"
            className="text-foreground text-base font-medium"
            onClick={() => setOpen(false)}
          >
            {t("cart")}
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
