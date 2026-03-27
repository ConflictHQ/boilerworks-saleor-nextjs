import { gql } from "@apollo/client";

// ---------------------------------------------------------------------------
// Fragments
// ---------------------------------------------------------------------------

const ADDRESS_FRAGMENT = gql`
  fragment AddressFields on Address {
    id
    firstName
    lastName
    companyName
    streetAddress1
    streetAddress2
    city
    cityArea
    postalCode
    country {
      code
      country
    }
    countryArea
    phone
  }
`;

const ORDER_FRAGMENT = gql`
  fragment OrderFields on Order {
    id
    number
    created
    status
    statusDisplay
    total {
      gross {
        amount
        currency
      }
      net {
        amount
        currency
      }
    }
    subtotal {
      gross {
        amount
        currency
      }
    }
    shippingPrice {
      gross {
        amount
        currency
      }
    }
    lines {
      id
      productName
      variantName
      quantity
      productSku
      thumbnail {
        url
        alt
      }
      unitPrice {
        gross {
          amount
          currency
        }
      }
      totalPrice {
        gross {
          amount
          currency
        }
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export const GET_ME = gql`
  ${ADDRESS_FRAGMENT}
  ${ORDER_FRAGMENT}
  query GetMe {
    me {
      id
      email
      firstName
      lastName
      isActive
      defaultShippingAddress {
        ...AddressFields
      }
      defaultBillingAddress {
        ...AddressFields
      }
      addresses {
        ...AddressFields
      }
      orders(first: 10) {
        edges {
          node {
            ...OrderFields
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
        totalCount
      }
    }
  }
`;

export const GET_MY_ORDERS = gql`
  ${ORDER_FRAGMENT}
  ${ADDRESS_FRAGMENT}
  query GetMyOrders($first: Int = 10, $after: String) {
    me {
      orders(first: $first, after: $after) {
        edges {
          node {
            ...OrderFields
            shippingAddress {
              ...AddressFields
            }
            billingAddress {
              ...AddressFields
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  }
`;

export const GET_ORDER_BY_TOKEN = gql`
  ${ORDER_FRAGMENT}
  ${ADDRESS_FRAGMENT}
  query GetOrderByToken($token: UUID!) {
    orderByToken(token: $token) {
      ...OrderFields
      shippingAddress {
        ...AddressFields
      }
      billingAddress {
        ...AddressFields
      }
    }
  }
`;
