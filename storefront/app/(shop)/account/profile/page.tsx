"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useQuery, useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GET_ME } from "@/graphql/account/account.queries";
import { UPDATE_ACCOUNT } from "@/graphql/account/account.mutations";
import { getAuthToken } from "@/lib/auth/token-store";

export default function ProfilePage() {
  const t = useTranslations("account");
  const token = getAuthToken();

  const { data, loading } = useQuery<any>(GET_ME, {
    skip: !token,
    fetchPolicy: "cache-and-network",
  });

  const [updateAccount, { loading: updating }] = useMutation<any>(UPDATE_ACCOUNT);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (data?.me) {
      setForm({
        firstName: data.me.firstName ?? "",
        lastName: data.me.lastName ?? "",
      });
    }
  }, [data?.me]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: updateData } = await updateAccount({
        variables: { firstName: form.firstName, lastName: form.lastName },
      });
      if (updateData?.accountUpdate?.errors?.length) {
        toast.error(updateData.accountUpdate.errors[0].message);
        return;
      }
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">{t("profile")}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t("updateProfile")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input value={data?.me?.email ?? ""} disabled />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First name</Label>
                <Input
                  value={form.firstName}
                  onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                />
              </div>
              <div>
                <Label>Last name</Label>
                <Input
                  value={form.lastName}
                  onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                />
              </div>
            </div>
            <Button type="submit" disabled={updating}>
              {updating ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
