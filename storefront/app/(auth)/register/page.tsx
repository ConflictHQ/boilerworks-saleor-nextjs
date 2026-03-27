"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { REGISTER } from "@/graphql/account/account.mutations";
import { DEFAULT_CHANNEL } from "@/lib/constants";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [register, { loading }] = useMutation<any>(REGISTER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await register({
        variables: {
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
          channel: DEFAULT_CHANNEL,
          redirectUrl: `${window.location.origin}/login`,
        },
      });

      if (data?.accountRegister?.errors?.length) {
        toast.error(data.accountRegister.errors[0].message);
        return;
      }

      toast.success("Account created! Please sign in.");
      router.push("/login");
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("register")}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                required
                value={form.firstName}
                onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                required
                value={form.lastName}
                onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              autoComplete="new-password"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              minLength={8}
              value={form.confirmPassword}
              onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
              autoComplete="new-password"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : t("register")}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {t("hasAccount")}{" "}
            <Link href="/login" className="text-primary hover:underline">
              {t("login")}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
