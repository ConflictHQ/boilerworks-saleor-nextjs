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
        <h1 className="text-foreground text-3xl font-bold">Categories</h1>
        <p className="text-muted-foreground mt-2">Browse products by category</p>
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
                  <div className="bg-muted aspect-[4/3]">
                    {category.backgroundImage?.url ? (
                      <img
                        src={category.backgroundImage.url}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="from-primary/10 to-primary/5 flex h-full w-full items-center justify-center bg-gradient-to-br">
                        <span className="text-primary/20 text-4xl font-bold">
                          {category.name[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-foreground group-hover:text-primary font-medium">
                      {category.name}
                    </h3>
                    {category.products && (
                      <p className="text-muted-foreground text-sm">
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
