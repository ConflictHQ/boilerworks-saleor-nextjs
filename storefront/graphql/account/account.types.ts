// ---------------------------------------------------------------------------
// Account GraphQL types -- Saleor 3.x
// ---------------------------------------------------------------------------

import type { Address } from "../checkout/checkout.types";
import type { Money, TaxedMoney, Thumbnail, PageInfo } from "../products/products.types";

export type { Address } from "../checkout/checkout.types";

export enum OrderStatus {
  CANCELED = "CANCELED",
  DRAFT = "DRAFT",
  FULFILLED = "FULFILLED",
  PARTIALLY_FULFILLED = "PARTIALLY_FULFILLED",
  PARTIALLY_RETURNED = "PARTIALLY_RETURNED",
  RETURNED = "RETURNED",
  UNCONFIRMED = "UNCONFIRMED",
  UNFULFILLED = "UNFULFILLED",
}

export interface OrderLine {
  id: string;
  productName: string;
  variantName: string;
  quantity: number;
  unitPrice: TaxedMoney;
  totalPrice: TaxedMoney;
  thumbnail: Thumbnail | null;
  productSku: string | null;
}

export interface Order {
  id: string;
  number: string;
  created: string;
  status: OrderStatus;
  total: TaxedMoney;
  subtotal: TaxedMoney;
  shippingPrice: TaxedMoney;
  statusDisplay: string;
  lines: OrderLine[];
  shippingAddress: Address | null;
  billingAddress: Address | null;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  addresses: Address[];
  defaultShippingAddress: Address | null;
  defaultBillingAddress: Address | null;
  orders: {
    edges: Array<{ node: Order }>;
    pageInfo: PageInfo;
    totalCount: number | null;
  } | null;
}

// ---------------------------------------------------------------------------
// Account error
// ---------------------------------------------------------------------------

export interface AccountError {
  field: string | null;
  message: string | null;
  code: string;
}

// ---------------------------------------------------------------------------
// Query variable types
// ---------------------------------------------------------------------------

export interface TokenCreateVariables {
  email: string;
  password: string;
}

export interface TokenRefreshVariables {
  refreshToken: string;
}

export interface RegisterVariables {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  channel: string;
  redirectUrl?: string;
}

export interface UpdateAccountVariables {
  firstName?: string;
  lastName?: string;
}

export interface AddressInput {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  city?: string;
  cityArea?: string;
  postalCode?: string;
  country?: string;
  countryArea?: string;
  phone?: string;
}

export interface CreateAddressVariables {
  input: AddressInput;
}

export interface UpdateAddressVariables {
  id: string;
  input: AddressInput;
}

export interface DeleteAddressVariables {
  id: string;
}

export interface SetDefaultAddressVariables {
  id: string;
  type: "BILLING" | "SHIPPING";
}

export interface GetMyOrdersVariables {
  first?: number;
  after?: string | null;
}

export interface GetOrderByTokenVariables {
  token: string;
}

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

export interface GetMeData {
  me: User | null;
}

export interface GetMyOrdersData {
  me: {
    orders: {
      edges: Array<{ node: Order }>;
      pageInfo: PageInfo;
      totalCount: number | null;
    };
  } | null;
}

export interface GetOrderByTokenData {
  orderByToken: Order | null;
}

export interface TokenCreateData {
  tokenCreate: {
    token: string | null;
    refreshToken: string | null;
    errors: AccountError[];
  };
}

export interface TokenRefreshData {
  tokenRefresh: {
    token: string | null;
    errors: AccountError[];
  };
}

export interface RegisterData {
  accountRegister: {
    user: User | null;
    errors: AccountError[];
  };
}

export interface UpdateAccountData {
  accountUpdate: {
    user: User | null;
    errors: AccountError[];
  };
}

export interface CreateAddressData {
  accountAddressCreate: {
    address: Address | null;
    errors: AccountError[];
  };
}

export interface UpdateAddressData {
  accountAddressUpdate: {
    address: Address | null;
    errors: AccountError[];
  };
}

export interface DeleteAddressData {
  accountAddressDelete: {
    address: Address | null;
    errors: AccountError[];
  };
}

export interface SetDefaultAddressData {
  accountSetDefaultAddress: {
    user: User | null;
    errors: AccountError[];
  };
}
