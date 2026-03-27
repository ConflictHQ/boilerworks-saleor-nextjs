import Link from "next/link";
import { getClient } from "@/lib/apollo/client";
import { GET_CATEGORIES } from "@/graphql/products/products.queries";
import { DEFAULT_CHANNEL } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Categories",
};

export default async function CategoriesPage() {
  const { data } = await getClient().query<any>({
    query: GET_CATEGORIES,
    variables: { first: 50 },
  });

  const categories =
    data?.categories?.edges?.map((edge: { node: Record<string, unknown> }) => edge.node) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Categories</h1>
        <p className="mt-2 text-muted-foreground">Browse products by category</p>
      </div>

      {categories.length === 0 ? (
        <p className="text-muted-foreground">No categories found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map(
            (category: {
              id: string;
              name: string;
              slug: string;
              backgroundImage?: { url: string } | null;
              products?: { totalCount: number };
            }) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="aspect-[4/3] bg-muted">
                    {category.backgroundImage?.url ? (
                      <img
                        src={category.backgroundImage.url}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                        <span className="text-4xl font-bold text-primary/20">
                          {category.name[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground group-hover:text-primary">
                      {category.name}
                    </h3>
                    {category.products && (
                      <p className="text-sm text-muted-foreground">
                        {category.products.totalCount} products
                      </p>
                    )}
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
