"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEARCH_DEBOUNCE_MS } from "@/lib/constants";

export function SearchDialog() {
  const t = useTranslations("search");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        setOpen(false);
        setQuery("");
      }
    },
    [query, router],
  );

  if (!open) {
    return (
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Search">
        <Search className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <Input
        type="search"
        placeholder={t("placeholder")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-9 w-48 sm:w-64"
        autoFocus
        onBlur={() => {
          if (!query.trim()) setOpen(false);
        }}
      />
      <Button type="submit" variant="ghost" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
