// ---------------------------------------------------------------------------
// Checkout GraphQL types -- Saleor 3.x
// ---------------------------------------------------------------------------

import type { Money, TaxedMoney, ProductVariant, Thumbnail } from "../products/products.types";

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  cityArea: string;
  postalCode: string;
  country: {
    code: string;
    country: string;
  };
  countryArea: string;
  phone: string;
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

export interface CheckoutLine {
  id: string;
  quantity: number;
  totalPrice: TaxedMoney;
  unitPrice: TaxedMoney;
  undiscountedUnitPrice: Money;
  variant: Pick<ProductVariant, "id" | "name" | "sku" | "pricing"> & {
    product: {
      id: string;
      name: string;
      slug: string;
      thumbnail: Thumbnail | null;
    };
  };
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string | null;
  price: Money;
  minimumDeliveryDays: number | null;
  maximumDeliveryDays: number | null;
  active: boolean;
}

export interface PaymentGateway {
  id: string;
  name: string;
  config: Array<{
    field: string;
    value: string;
  }>;
}

export interface CheckoutError {
  field: string | null;
  message: string | null;
  code: string;
}

export interface Checkout {
  id: string;
  token: string;
  email: string | null;
  lines: CheckoutLine[];
  totalPrice: TaxedMoney;
  subtotalPrice: TaxedMoney;
  shippingPrice: TaxedMoney;
  discount: Money | null;
  voucherCode: string | null;
  shippingAddress: Address | null;
  billingAddress: Address | null;
  shippingMethods: ShippingMethod[];
  availablePaymentGateways: PaymentGateway[];
  isShippingRequired: boolean;
  quantity: number;
}

// ---------------------------------------------------------------------------
// Query / mutation variable types
// ---------------------------------------------------------------------------

export interface CheckoutLineInput {
  variantId: string;
  quantity: number;
}

export interface CheckoutLineUpdateInput {
  lineId: string;
  quantity: number;
}

export interface CreateCheckoutVariables {
  channel: string;
  email?: string;
  lines: CheckoutLineInput[];
}

export interface GetCheckoutVariables {
  id: string;
}

export interface AddCheckoutLinesVariables {
  checkoutId: string;
  lines: CheckoutLineInput[];
}

export interface UpdateCheckoutLineVariables {
  checkoutId: string;
  lines: CheckoutLineUpdateInput[];
}

export interface DeleteCheckoutLinesVariables {
  checkoutId: string;
  linesIds: string[];
}

export interface SetCheckoutAddressVariables {
  checkoutId: string;
  address: AddressInput;
}

export interface SetCheckoutShippingMethodVariables {
  checkoutId: string;
  deliveryMethodId: string;
}

export interface SetCheckoutEmailVariables {
  checkoutId: string;
  email: string;
}

export interface CompleteCheckoutVariables {
  checkoutId: string;
}

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

export interface CheckoutMutationResult {
  checkout: Checkout | null;
  errors: CheckoutError[];
}

export interface GetCheckoutData {
  checkout: Checkout | null;
}

export interface CreateCheckoutData {
  checkoutCreate: CheckoutMutationResult;
}

export interface AddCheckoutLinesData {
  checkoutLinesAdd: CheckoutMutationResult;
}

export interface UpdateCheckoutLineData {
  checkoutLinesUpdate: CheckoutMutationResult;
}

export interface DeleteCheckoutLinesData {
  checkoutLinesDelete: CheckoutMutationResult;
}

export interface SetCheckoutShippingAddressData {
  checkoutShippingAddressUpdate: CheckoutMutationResult;
}

export interface SetCheckoutBillingAddressData {
  checkoutBillingAddressUpdate: CheckoutMutationResult;
}

export interface SetCheckoutShippingMethodData {
  checkoutDeliveryMethodUpdate: CheckoutMutationResult;
}

export interface SetCheckoutEmailData {
  checkoutEmailUpdate: CheckoutMutationResult;
}

export interface CompleteCheckoutData {
  checkoutComplete: {
    order: {
      id: string;
      number: string;
      status: string;
    } | null;
    errors: CheckoutError[];
  };
}
