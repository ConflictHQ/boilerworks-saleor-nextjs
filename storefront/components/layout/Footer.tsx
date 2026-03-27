"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { StoreIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="text-primary flex items-center gap-2 text-lg font-bold">
              <StoreIcon className="h-5 w-5" />
              Boilerworks Store
            </Link>
            <p className="text-muted-foreground text-sm">
              E-commerce storefront powered by Saleor and Next.js.
            </p>
          </div>

          <div>
            <h3 className="text-foreground mb-3 text-sm font-semibold tracking-wider uppercase">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground mb-3 text-sm font-semibold tracking-wider uppercase">
              Account
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/account/orders"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/account/addresses"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Addresses
                </Link>
              </li>
              <li>
                <Link
                  href="/account/profile"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground mb-3 text-sm font-semibold tracking-wider uppercase">
              Info
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-muted-foreground text-center text-sm">
          {t("copyright", { year: String(year) })}
        </p>
      </div>
    </footer>
  );
}
