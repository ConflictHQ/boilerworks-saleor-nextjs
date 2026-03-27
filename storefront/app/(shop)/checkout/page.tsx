"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { CHECKOUT_ID_COOKIE } from "@/lib/constants";
import {
  SET_CHECKOUT_SHIPPING_ADDRESS,
  SET_CHECKOUT_BILLING_ADDRESS,
  SET_CHECKOUT_EMAIL,
  COMPLETE_CHECKOUT,
} from "@/graphql/checkout/checkout.mutations";

type Step = "address" | "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const router = useRouter();
  const { checkout, lines, loading } = useCart();
  const [step, setStep] = useState<Step>("address");
  const [submitting, setSubmitting] = useState(false);

  const [setShippingAddress] = useMutation<any>(SET_CHECKOUT_SHIPPING_ADDRESS);
  const [setBillingAddress] = useMutation<any>(SET_CHECKOUT_BILLING_ADDRESS);
  const [setCheckoutEmail] = useMutation<any>(SET_CHECKOUT_EMAIL);
  const [completeCheckout] = useMutation<any>(COMPLETE_CHECKOUT);

  const [address, setAddress] = useState({
    email: "",
    firstName: "",
    lastName: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    countryArea: "",
    postalCode: "",
    country: "US",
    phone: "",
  });

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!checkout || lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">Your cart is empty.</p>
      </div>
    );
  }

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const checkoutId = checkout.id;
      const addressInput = {
        firstName: address.firstName,
        lastName: address.lastName,
        streetAddress1: address.streetAddress1,
        streetAddress2: address.streetAddress2,
        city: address.city,
        countryArea: address.countryArea,
        postalCode: address.postalCode,
        country: address.country,
        phone: address.phone,
      };

      await setCheckoutEmail({
        variables: { checkoutId, email: address.email },
      });

      const { data: shippingData } = await setShippingAddress({
        variables: { checkoutId, shippingAddress: addressInput },
      });

      if (shippingData?.checkoutShippingAddressUpdate?.errors?.length) {
        toast.error(shippingData.checkoutShippingAddressUpdate.errors[0].message);
        return;
      }

      await setBillingAddress({
        variables: { checkoutId, billingAddress: addressInput },
      });

      setStep("review");
    } catch {
      toast.error("Failed to update address");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      const { data } = await completeCheckout({
        variables: { checkoutId: checkout.id },
      });

      if (data?.checkoutComplete?.errors?.length) {
        toast.error(data.checkoutComplete.errors[0].message);
        return;
      }

      const order = data?.checkoutComplete?.order;
      if (order) {
        Cookies.remove(CHECKOUT_ID_COOKIE);
        router.push(`/checkout/confirmation?order=${order.number}`);
      }
    } catch {
      toast.error("Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">{t("title")}</h1>

      <div className="mb-6 flex gap-2">
        {(["address", "review"] as const).map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full ${
              step === s || (s === "address" && step === "review")
                ? "bg-primary"
                : "bg-muted"
            }`}
          />
        ))}
      </div>

      {step === "address" && (
        <form onSubmit={handleAddressSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("shipping")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={address.email}
                  onChange={(e) => setAddress((a) => ({ ...a, email: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">{t("firstName")}</Label>
                  <Input
                    id="firstName"
                    required
                    value={address.firstName}
                    onChange={(e) => setAddress((a) => ({ ...a, firstName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">{t("lastName")}</Label>
                  <Input
                    id="lastName"
                    required
                    value={address.lastName}
                    onChange={(e) => setAddress((a) => ({ ...a, lastName: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address1">{t("address1")}</Label>
                <Input
                  id="address1"
                  required
                  value={address.streetAddress1}
                  onChange={(e) => setAddress((a) => ({ ...a, streetAddress1: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="address2">{t("address2")}</Label>
                <Input
                  id="address2"
                  value={address.streetAddress2}
                  onChange={(e) => setAddress((a) => ({ ...a, streetAddress2: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">{t("city")}</Label>
                  <Input
                    id="city"
                    required
                    value={address.city}
                    onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="state">{t("state")}</Label>
                  <Input
                    id="state"
                    value={address.countryArea}
                    onChange={(e) => setAddress((a) => ({ ...a, countryArea: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zip">{t("zip")}</Label>
                  <Input
                    id="zip"
                    required
                    value={address.postalCode}
                    onChange={(e) => setAddress((a) => ({ ...a, postalCode: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t("phone")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress((a) => ({ ...a, phone: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Saving..." : "Continue to review"}
          </Button>
        </form>
      )}

      {step === "review" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("review")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Shipping to</p>
                <p className="font-medium">
                  {address.firstName} {address.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {address.streetAddress1}, {address.city}, {address.countryArea}{" "}
                  {address.postalCode}
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                {lines.map(
                  (line: {
                    id: string;
                    quantity: number;
                    variant: { product: { name: string } };
                    totalPrice?: { gross: { amount: number; currency: string } };
                  }) => (
                    <div key={line.id} className="flex justify-between text-sm">
                      <span>
                        {line.variant.product.name} x{line.quantity}
                      </span>
                      {line.totalPrice && (
                        <span>
                          {formatPrice(
                            line.totalPrice.gross.amount,
                            line.totalPrice.gross.currency,
                          )}
                        </span>
                      )}
                    </div>
                  ),
                )}
              </div>
              <Separator />
              {checkout.totalPrice && (
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    {formatPrice(
                      checkout.totalPrice.gross.amount,
                      checkout.totalPrice.gross.currency,
                    )}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={() => setStep("address")}>
              Back
            </Button>
            <Button className="flex-1" disabled={submitting} onClick={handlePlaceOrder}>
              {submitting ? "Placing order..." : t("placeOrder")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
