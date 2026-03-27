"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useQuery } from "@apollo/client/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GET_MY_ORDERS } from "@/graphql/account/account.queries";
import { getAuthToken } from "@/lib/auth/token-store";
import { formatPrice, formatDate } from "@/lib/utils";

export default function OrdersPage() {
  const t = useTranslations("account");
  const token = getAuthToken();

  const { data, loading } = useQuery<any>(GET_MY_ORDERS, {
    skip: !token,
    fetchPolicy: "cache-and-network",
  });

  const orders =
    data?.me?.orders?.edges?.map((edge: { node: Record<string, unknown> }) => edge.node) ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">{t("orders")}</h1>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-muted-foreground">{t("noOrders")}</p>
      ) : (
        <div className="space-y-4">
          {orders.map(
            (order: {
              id: string;
              number: string;
              created: string;
              status: string;
              total: { gross: { amount: number; currency: string } };
            }) => (
              <Link key={order.id} href={`/account/orders/${order.id}`}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">Order #{order.number}</p>
                      <p className="text-muted-foreground text-sm">{formatDate(order.created)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">{order.status}</Badge>
                      <span className="font-medium">
                        {formatPrice(order.total.gross.amount, order.total.gross.currency)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ),
          )}
        </div>
      )}
    </div>
  );
}
