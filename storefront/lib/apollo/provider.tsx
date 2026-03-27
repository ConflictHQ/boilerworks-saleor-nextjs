"use client";

import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { SALEOR_API_URL } from "@/lib/constants";
import { getAuthToken } from "@/lib/auth/token-store";

function makeClient() {
  const httpLink = createHttpLink({
    uri: SALEOR_API_URL,
    credentials: "include",
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = getAuthToken();
    return {
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  });

  const errorLink = new ErrorLink(({ error }) => {
    if (CombinedGraphQLErrors.is(error)) {
      for (const graphQLError of error.errors) {
        if (
          graphQLError.extensions?.code === "UNAUTHENTICATED" ||
          (graphQLError.extensions?.exception as Record<string, unknown>)?.code ===
            "ExpiredSignatureError"
        ) {
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
      }
    }
  });

  return new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache(),
  });
}

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
