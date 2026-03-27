import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/client-integration-nextjs";
import { SALEOR_API_URL } from "@/lib/constants";

const httpLink = createHttpLink({
  uri: SALEOR_API_URL,
  credentials: "include",
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
});
