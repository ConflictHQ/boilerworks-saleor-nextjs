import { gql } from "@apollo/client";
import { CHECKOUT_FRAGMENT } from "./checkout.queries";

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export const CREATE_CHECKOUT = gql`
  ${CHECKOUT_FRAGMENT}
  mutation CreateCheckout(
    $channel: String!
    $email: String
    $lines: [CheckoutLineInput!]!
  ) {
    checkoutCreate(
      input: { channel: $channel, email: $email, lines: $lines }
    ) {
      checkout {
        ...CheckoutFields
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

export const ADD_CHECKOUT_LINES = gql`
  ${CHECKOUT_FRAGMENT}
  mutation AddCheckoutLines(
    $checkoutId: ID!
    $lines: [CheckoutLineInput!]!
  ) {
    checkoutLinesAdd(id: $checkoutId, lines: $lines) {
      checkout {
        ...CheckoutFields
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

export const UPDATE_CHECKOUT_LINE = gql`
  ${CHECKOUT_FRAGMENT}
  mutation UpdateCheckoutLine(
    $checkoutId: ID!
    $lines: [CheckoutLineUpdateInput!]!
  ) {
    checkoutLinesUpdate(id: $checkoutId, lines: $lines) {
      checkout {
        ...CheckoutFields
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

export const DELETE_CHECKOUT_LINES = gql`
  ${CHECKOUT_FRAGMENT}
  mutation DeleteCheckoutLines($checkoutId: ID!, $linesIds: [ID!]!) {
    checkoutLinesDelete(id: $checkoutId, linesIds: $linesIds) {
      checkout {
        ...CheckoutFields
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

export const SET_CHECKOUT_SHIPPING_ADDRESS = gql`
  ${CHECKOUT_FRAGMENT}
  mutation SetCheckoutShippingAddress(
    $checkoutId: ID!
    $address: AddressInput!
  ) {
    checkoutShippingAddressUpdate(
      id: $checkoutId
      shippingAddress: $address
    ) {
      checkout {
        ...CheckoutFields
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

export const SET_CHECKOUT_BILLING_ADDRESS = gql`
  ${CHECKOUT_FRAGMENT}
  mutation SetCheckoutBillingAddress(
    $checkoutId: ID!
    $address: AddressInput!
  ) {
    checkoutBillingAddressUpdate(
      id: $checkoutId
      billingAddress: $address
    ) {
      checkout {
        ...CheckoutFields
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

export const SET_CHECKOUT_SHIPPING_METHOD = gql`
  ${CHECKOUT_FRAGMENT}
  mutation SetCheckoutShippingMethod(
    $checkoutId: ID!
    $deliveryMethodId: ID!
  ) {
    checkoutDeliveryMethodUpdate(
      id: $checkoutId
      deliveryMethodId: $deliveryMethodId
    ) {
      checkout {
        ...CheckoutFields
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

export const SET_CHECKOUT_EMAIL = gql`
  ${CHECKOUT_FRAGMENT}
  mutation SetCheckoutEmail($checkoutId: ID!, $email: String!) {
    checkoutEmailUpdate(id: $checkoutId, email: $email) {
      checkout {
        ...CheckoutFields
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

export const COMPLETE_CHECKOUT = gql`
  mutation CompleteCheckout($checkoutId: ID!) {
    checkoutComplete(id: $checkoutId) {
      order {
        id
        number
        status
      }
      errors {
        field
        message
        code
      }
    }
  }
`;
