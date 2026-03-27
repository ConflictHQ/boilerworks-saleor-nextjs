"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery, useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GET_ME } from "@/graphql/account/account.queries";
import {
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  SET_DEFAULT_ADDRESS,
} from "@/graphql/account/account.mutations";
import { getAuthToken } from "@/lib/auth/token-store";

export default function AddressesPage() {
  const t = useTranslations("account");
  const token = getAuthToken();
  const [showForm, setShowForm] = useState(false);

  const { data, loading, refetch } = useQuery<any>(GET_ME, {
    skip: !token,
    fetchPolicy: "cache-and-network",
  });

  const [createAddress] = useMutation<any>(CREATE_ADDRESS);
  const [deleteAddress] = useMutation<any>(DELETE_ADDRESS);
  const [setDefault] = useMutation<any>(SET_DEFAULT_ADDRESS);

  const [form, setForm] = useState({
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

  const addresses = data?.me?.addresses ?? [];
  const defaultShipping = data?.me?.defaultShippingAddress?.id;
  const defaultBilling = data?.me?.defaultBillingAddress?.id;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: createData } = await createAddress({
        variables: { input: form },
      });
      if (createData?.accountAddressCreate?.errors?.length) {
        toast.error(createData.accountAddressCreate.errors[0].message);
        return;
      }
      toast.success("Address added");
      setShowForm(false);
      setForm({
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
      await refetch();
    } catch {
      toast.error("Failed to add address");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAddress({ variables: { id } });
      toast.success("Address deleted");
      await refetch();
    } catch {
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefault = async (id: string, type: "SHIPPING" | "BILLING") => {
    try {
      await setDefault({ variables: { id, type } });
      toast.success(`Default ${type.toLowerCase()} address updated`);
      await refetch();
    } catch {
      toast.error("Failed to update default address");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("addresses")}</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("addAddress")}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First name</Label>
                  <Input
                    required
                    value={form.firstName}
                    onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Last name</Label>
                  <Input
                    required
                    value={form.lastName}
                    onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  required
                  value={form.streetAddress1}
                  onChange={(e) => setForm((f) => ({ ...f, streetAddress1: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>City</Label>
                  <Input
                    required
                    value={form.city}
                    onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    value={form.countryArea}
                    onChange={(e) => setForm((f) => ({ ...f, countryArea: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Postal code</Label>
                  <Input
                    required
                    value={form.postalCode}
                    onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Save address</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : addresses.length === 0 ? (
        <p className="text-muted-foreground">{t("noAddresses")}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map(
            (addr: {
              id: string;
              firstName: string;
              lastName: string;
              streetAddress1: string;
              city: string;
              countryArea: string;
              postalCode: string;
              country: { country: string };
            }) => (
              <Card key={addr.id}>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <p className="font-medium">
                        {addr.firstName} {addr.lastName}
                      </p>
                      <p className="text-muted-foreground text-sm">{addr.streetAddress1}</p>
                      <p className="text-muted-foreground text-sm">
                        {addr.city}, {addr.countryArea} {addr.postalCode}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {addr.id === defaultShipping && <Badge variant="outline">Shipping</Badge>}
                      {addr.id === defaultBilling && <Badge variant="outline">Billing</Badge>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSetDefault(addr.id, "SHIPPING")}
                    >
                      Set shipping default
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDelete(addr.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ),
          )}
        </div>
      )}
    </div>
  );
}
