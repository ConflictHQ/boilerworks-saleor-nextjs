"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { StoreIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-primary">
              <StoreIcon className="h-5 w-5" />
              Boilerworks Store
            </Link>
            <p className="text-sm text-muted-foreground">
              E-commerce storefront powered by Saleor and Next.js.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              Account
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/account/orders"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/account/addresses"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Addresses
                </Link>
              </li>
              <li>
                <Link
                  href="/account/profile"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              Info
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-sm text-muted-foreground">
          {t("copyright", { year: String(year) })}
        </p>
      </div>
    </footer>
  );
}
