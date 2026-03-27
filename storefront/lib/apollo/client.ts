import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/client-integration-nextjs";
import { SALEOR_API_URL_SSR } from "@/lib/constants";

const httpLink = createHttpLink({
  uri: SALEOR_API_URL_SSR,
  credentials: "include",
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
});
