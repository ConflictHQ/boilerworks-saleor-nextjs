"use client";

import { use } from "react";
import { useQuery } from "@apollo/client/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GET_ORDER_BY_TOKEN } from "@/graphql/account/account.queries";
import { formatPrice, formatDate } from "@/lib/utils";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = use(params);
  const { data, loading } = useQuery<any>(GET_ORDER_BY_TOKEN, {
    variables: { token: id },
    fetchPolicy: "cache-and-network",
  });

  const order = data?.orderByToken;

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-muted-foreground">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Order #{order.number}</h1>
        <Badge variant="secondary">{order.status}</Badge>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date</span>
            <span>{formatDate(order.created)}</span>
          </div>

          <Separator />

          {order.lines?.map(
            (line: {
              id: string;
              productName: string;
              variantName: string;
              quantity: number;
              totalPrice: { gross: { amount: number; currency: string } };
            }) => (
              <div key={line.id} className="flex justify-between text-sm">
                <span>
                  {line.productName}
                  {line.variantName && ` - ${line.variantName}`} x{line.quantity}
                </span>
                <span>
                  {formatPrice(line.totalPrice.gross.amount, line.totalPrice.gross.currency)}
                </span>
              </div>
            ),
          )}

          <Separator />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatPrice(order.total.gross.amount, order.total.gross.currency)}</span>
          </div>
        </CardContent>
      </Card>

      {order.shippingAddress && (
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p className="text-muted-foreground text-sm">
              {order.shippingAddress.streetAddress1}
              {order.shippingAddress.streetAddress2 && `, ${order.shippingAddress.streetAddress2}`}
            </p>
            <p className="text-muted-foreground text-sm">
              {order.shippingAddress.city}, {order.shippingAddress.countryArea}{" "}
              {order.shippingAddress.postalCode}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
