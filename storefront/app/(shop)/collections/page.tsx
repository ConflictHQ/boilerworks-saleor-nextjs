import Link from "next/link";
import { getClient } from "@/lib/apollo/client";
import { GET_COLLECTIONS } from "@/graphql/products/products.queries";
import { DEFAULT_CHANNEL } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Collections",
};

export default async function CollectionsPage() {
  const { data } = await getClient().query<any>({
    query: GET_COLLECTIONS,
    variables: { channel: DEFAULT_CHANNEL, first: 50 },
  });

  const collections =
    data?.collections?.edges?.map((edge: { node: Record<string, unknown> }) => edge.node) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Collections</h1>
        <p className="mt-2 text-muted-foreground">Curated product collections</p>
      </div>

      {collections.length === 0 ? (
        <p className="text-muted-foreground">No collections found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map(
            (collection: {
              id: string;
              name: string;
              slug: string;
              backgroundImage?: { url: string } | null;
              products?: { totalCount: number };
            }) => (
              <Link key={collection.id} href={`/collections/${collection.slug}`}>
                <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="aspect-[16/9] bg-muted">
                    {collection.backgroundImage?.url ? (
                      <img
                        src={collection.backgroundImage.url}
                        alt={collection.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                        <span className="text-5xl font-bold text-primary/20">
                          {collection.name[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium text-foreground group-hover:text-primary">
                      {collection.name}
                    </h3>
                    {collection.products && (
                      <p className="text-sm text-muted-foreground">
                        {collection.products.totalCount} products
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
