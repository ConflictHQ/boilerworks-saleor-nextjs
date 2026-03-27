import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { ApolloWrapper } from "@/lib/apollo/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Boilerworks Store",
    template: "%s · Boilerworks Store",
  },
  description: "E-commerce storefront powered by Saleor and Next.js",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <ApolloWrapper>
              {children}
              <Toaster position="bottom-right" />
            </ApolloWrapper>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
