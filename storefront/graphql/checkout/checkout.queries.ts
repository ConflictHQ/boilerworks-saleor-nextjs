import { gql } from "@apollo/client";

// ---------------------------------------------------------------------------
// Fragments
// ---------------------------------------------------------------------------

export const CHECKOUT_FRAGMENT = gql`
  fragment CheckoutFields on Checkout {
    id
    token
    email
    quantity
    isShippingRequired
    discount {
      amount
      currency
    }
    voucherCode
    lines {
      id
      quantity
      totalPrice {
        gross {
          amount
          currency
        }
        net {
          amount
          currency
        }
      }
      unitPrice {
        gross {
          amount
          currency
        }
        net {
          amount
          currency
        }
      }
      undiscountedUnitPrice {
        amount
        currency
      }
      variant {
        id
        name
        sku
        pricing {
          onSale
          price {
            gross {
              amount
              currency
            }
          }
        }
        product {
          id
          name
          slug
          thumbnail {
            url
            alt
          }
        }
      }
    }
    totalPrice {
      gross {
        amount
        currency
      }
      net {
        amount
        currency
      }
      tax {
        amount
        currency
      }
    }
    subtotalPrice {
      gross {
        amount
        currency
      }
      net {
        amount
        currency
      }
    }
    shippingPrice {
      gross {
        amount
        currency
      }
      net {
        amount
        currency
      }
    }
    shippingAddress {
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
    billingAddress {
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
    shippingMethods {
      id
      name
      description
      price {
        amount
        currency
      }
      minimumDeliveryDays
      maximumDeliveryDays
      active
    }
    availablePaymentGateways {
      id
      name
      config {
        field
        value
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export const GET_CHECKOUT = gql`
  ${CHECKOUT_FRAGMENT}
  query GetCheckout($id: ID!) {
    checkout(id: $id) {
      ...CheckoutFields
    }
  }
`;
