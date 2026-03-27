"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useQuery } from "@apollo/client/react";
import { Package, MapPin, User, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GET_ME } from "@/graphql/account/account.queries";
import { getAuthToken, clearTokens } from "@/lib/auth/token-store";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const t = useTranslations("account");
  const tn = useTranslations("nav");
  const router = useRouter();
  const token = getAuthToken();

  const { data, loading } = useQuery<any>(GET_ME, {
    skip: !token,
    fetchPolicy: "cache-and-network",
  });

  if (!token) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold">{t("title")}</h1>
        <p className="mb-6 text-muted-foreground">Sign in to access your account.</p>
        <Button asChild>
          <Link href="/login">{tn("login")}</Link>
        </Button>
      </div>
    );
  }

  const user = data?.me;

  const handleLogout = () => {
    clearTokens();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          {user && (
            <p className="mt-1 text-muted-foreground">
              {user.firstName} {user.lastName} ({user.email})
            </p>
          )}
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          {tn("logout")}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/account/orders">
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-3">
              <Package className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">{tn("orders")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">View your order history</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/account/addresses">
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">{tn("addresses")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Manage saved addresses</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/account/profile">
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">{tn("profile")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Update your profile</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
