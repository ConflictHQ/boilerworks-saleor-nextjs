"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ShoppingCart, User, Search, StoreIcon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useCart } from "@/hooks/useCart";

export function Header() {
  const t = useTranslations("nav");
  const { totalItems } = useCart();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <MobileMenu />
          <Link href="/" className="text-primary flex items-center gap-2 text-xl font-bold">
            <StoreIcon className="h-6 w-6" />
            <span className="hidden sm:inline">Boilerworks</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/products"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {t("products")}
            </Link>
            <Link
              href="/categories"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {t("categories")}
            </Link>
            <Link
              href="/collections"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {t("collections")}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <SearchDialog />
          <ThemeToggle />
          <Link href="/account">
            <Button variant="ghost" size="icon" aria-label={t("account")}>
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <CartDrawer>
            <Button variant="ghost" size="icon" className="relative" aria-label={t("cart")}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Button>
          </CartDrawer>
        </div>
      </div>
    </header>
  );
}
