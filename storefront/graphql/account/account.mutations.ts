import { gql } from "@apollo/client";

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export const TOKEN_CREATE = gql`
  mutation TokenCreate($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      refreshToken
      errors {
        field
        message
        code
      }
    }
  }
`;

export const TOKEN_REFRESH = gql`
  mutation TokenRefresh($refreshToken: String!) {
    tokenRefresh(refreshToken: $refreshToken) {
      token
      errors {
        field
        message
        code
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $channel: String!
    $redirectUrl: String
  ) {
    accountRegister(
      input: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        channel: $channel
        redirectUrl: $redirectUrl
      }
    ) {
      user {
        id
        email
        firstName
        lastName
        isActive
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

export const UPDATE_ACCOUNT = gql`
  mutation UpdateAccount($firstName: String, $lastName: String) {
    accountUpdate(input: { firstName: $firstName, lastName: $lastName }) {
      user {
        id
        email
        firstName
        lastName
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

export const CREATE_ADDRESS = gql`
  mutation CreateAddress($input: AddressInput!) {
    accountAddressCreate(input: $input) {
      address {
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
      errors {
        field
        message
        code
      }
    }
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation UpdateAddress($id: ID!, $input: AddressInput!) {
    accountAddressUpdate(id: $id, input: $input) {
      address {
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
      errors {
        field
        message
        code
      }
    }
  }
`;

export const DELETE_ADDRESS = gql`
  mutation DeleteAddress($id: ID!) {
    accountAddressDelete(id: $id) {
      address {
        id
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

export const SET_DEFAULT_ADDRESS = gql`
  mutation SetDefaultAddress($id: ID!, $type: AddressTypeEnum!) {
    accountSetDefaultAddress(id: $id, type: $type) {
      user {
        id
        defaultShippingAddress {
          id
        }
        defaultBillingAddress {
          id
        }
      }
      errors {
        field
        message
        code
      }
    }
  }
`;
