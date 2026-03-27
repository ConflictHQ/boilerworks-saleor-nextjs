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
import { TOKEN_CREATE } from "@/graphql/account/account.mutations";
import { setAuthToken, setRefreshToken } from "@/lib/auth/token-store";

export default function LoginPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tokenCreate, { loading }] = useMutation<any>(TOKEN_CREATE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await tokenCreate({
        variables: { email, password },
      });

      if (data?.tokenCreate?.errors?.length) {
        toast.error(data.tokenCreate.errors[0].message || t("invalidCredentials"));
        return;
      }

      const { token, refreshToken } = data.tokenCreate;
      if (token) setAuthToken(token);
      if (refreshToken) setRefreshToken(refreshToken);

      router.push("/account");
    } catch {
      toast.error(t("invalidCredentials"));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("login")}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : t("login")}
          </Button>
          <p className="text-muted-foreground text-center text-sm">
            {t("noAccount")}{" "}
            <Link href="/register" className="text-primary hover:underline">
              {t("register")}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
