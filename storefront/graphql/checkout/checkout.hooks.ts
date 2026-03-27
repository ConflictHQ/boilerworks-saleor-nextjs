"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import { DEFAULT_CHANNEL } from "@/lib/constants";
import { GET_CHECKOUT } from "./checkout.queries";
import {
  CREATE_CHECKOUT,
  ADD_CHECKOUT_LINES,
  UPDATE_CHECKOUT_LINE,
  DELETE_CHECKOUT_LINES,
  SET_CHECKOUT_SHIPPING_ADDRESS,
  SET_CHECKOUT_BILLING_ADDRESS,
  SET_CHECKOUT_SHIPPING_METHOD,
  SET_CHECKOUT_EMAIL,
  COMPLETE_CHECKOUT,
} from "./checkout.mutations";
import type {
  GetCheckoutData,
  GetCheckoutVariables,
  CreateCheckoutData,
  CreateCheckoutVariables,
  AddCheckoutLinesData,
  AddCheckoutLinesVariables,
  UpdateCheckoutLineData,
  UpdateCheckoutLineVariables,
  DeleteCheckoutLinesData,
  DeleteCheckoutLinesVariables,
  SetCheckoutShippingAddressData,
  SetCheckoutAddressVariables,
  SetCheckoutBillingAddressData,
  SetCheckoutShippingMethodData,
  SetCheckoutShippingMethodVariables,
  SetCheckoutEmailData,
  SetCheckoutEmailVariables,
  CompleteCheckoutData,
  CompleteCheckoutVariables,
  CheckoutLineInput,
  AddressInput,
} from "./checkout.types";

// ---------------------------------------------------------------------------
// Query
// ---------------------------------------------------------------------------

export const useCheckout = (id: string | null) => {
  return useQuery<GetCheckoutData, GetCheckoutVariables>(GET_CHECKOUT, {
    variables: { id: id! },
    fetchPolicy: "cache-and-network",
    skip: !id,
  });
};

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export const useCreateCheckout = () => {
  const [createCheckout, result] = useMutation<
    CreateCheckoutData,
    CreateCheckoutVariables
  >(CREATE_CHECKOUT);

  const execute = (lines: CheckoutLineInput[], email?: string) =>
    createCheckout({
      variables: {
        channel: DEFAULT_CHANNEL,
        email,
        lines,
      },
    });

  return { createCheckout: execute, ...result };
};

export const useAddCheckoutLines = () => {
  const [addLines, result] = useMutation<
    AddCheckoutLinesData,
    AddCheckoutLinesVariables
  >(ADD_CHECKOUT_LINES);

  const execute = (checkoutId: string, lines: CheckoutLineInput[]) =>
    addLines({
      variables: { checkoutId, lines },
    });

  return { addCheckoutLines: execute, ...result };
};

export const useUpdateCheckoutLine = () => {
  const [updateLine, result] = useMutation<
    UpdateCheckoutLineData,
    UpdateCheckoutLineVariables
  >(UPDATE_CHECKOUT_LINE);

  const execute = (
    checkoutId: string,
    lines: Array<{ lineId: string; quantity: number }>,
  ) =>
    updateLine({
      variables: { checkoutId, lines },
    });

  return { updateCheckoutLine: execute, ...result };
};

export const useDeleteCheckoutLines = () => {
  const [deleteLines, result] = useMutation<
    DeleteCheckoutLinesData,
    DeleteCheckoutLinesVariables
  >(DELETE_CHECKOUT_LINES);

  const execute = (checkoutId: string, linesIds: string[]) =>
    deleteLines({
      variables: { checkoutId, linesIds },
    });

  return { deleteCheckoutLines: execute, ...result };
};

export const useSetCheckoutShippingAddress = () => {
  const [setAddress, result] = useMutation<
    SetCheckoutShippingAddressData,
    SetCheckoutAddressVariables
  >(SET_CHECKOUT_SHIPPING_ADDRESS);

  const execute = (checkoutId: string, address: AddressInput) =>
    setAddress({
      variables: { checkoutId, address },
    });

  return { setShippingAddress: execute, ...result };
};

export const useSetCheckoutBillingAddress = () => {
  const [setAddress, result] = useMutation<
    SetCheckoutBillingAddressData,
    SetCheckoutAddressVariables
  >(SET_CHECKOUT_BILLING_ADDRESS);

  const execute = (checkoutId: string, address: AddressInput) =>
    setAddress({
      variables: { checkoutId, address },
    });

  return { setBillingAddress: execute, ...result };
};

export const useSetCheckoutShippingMethod = () => {
  const [setMethod, result] = useMutation<
    SetCheckoutShippingMethodData,
    SetCheckoutShippingMethodVariables
  >(SET_CHECKOUT_SHIPPING_METHOD);

  const execute = (checkoutId: string, deliveryMethodId: string) =>
    setMethod({
      variables: { checkoutId, deliveryMethodId },
    });

  return { setShippingMethod: execute, ...result };
};

export const useSetCheckoutEmail = () => {
  const [setEmail, result] = useMutation<
    SetCheckoutEmailData,
    SetCheckoutEmailVariables
  >(SET_CHECKOUT_EMAIL);

  const execute = (checkoutId: string, email: string) =>
    setEmail({
      variables: { checkoutId, email },
    });

  return { setCheckoutEmail: execute, ...result };
};

export const useCompleteCheckout = () => {
  const [complete, result] = useMutation<
    CompleteCheckoutData,
    CompleteCheckoutVariables
  >(COMPLETE_CHECKOUT);

  const execute = (checkoutId: string) =>
    complete({
      variables: { checkoutId },
    });

  return { completeCheckout: execute, ...result };
};
