import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Order Confirmation",
};

interface ConfirmationPageProps {
  searchParams: Promise<{ order?: string }>;
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const params = await searchParams;
  const orderNumber = params.order;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 lg:px-8">
      <Card>
        <CardContent className="flex flex-col items-center space-y-6 p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <h1 className="text-2xl font-bold">Order Placed!</h1>
          {orderNumber && <p className="text-muted-foreground">Order #{orderNumber}</p>}
          <p className="text-muted-foreground">
            Thank you for your order. You will receive a confirmation email shortly.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/account/orders">View Orders</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
