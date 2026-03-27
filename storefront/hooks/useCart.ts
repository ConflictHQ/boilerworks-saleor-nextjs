"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import Cookies from "js-cookie";
import { CHECKOUT_ID_COOKIE, DEFAULT_CHANNEL } from "@/lib/constants";
import { GET_CHECKOUT } from "@/graphql/checkout/checkout.queries";
import {
  CREATE_CHECKOUT,
  ADD_CHECKOUT_LINES,
  UPDATE_CHECKOUT_LINE,
  DELETE_CHECKOUT_LINES,
} from "@/graphql/checkout/checkout.mutations";

function getCheckoutId(): string | null {
  if (typeof window === "undefined") return null;
  return Cookies.get(CHECKOUT_ID_COOKIE) ?? null;
}

function setCheckoutId(id: string): void {
  Cookies.set(CHECKOUT_ID_COOKIE, id, {
    path: "/",
    sameSite: "lax",
    expires: 30,
  });
}

export function useCart() {
  const checkoutId = getCheckoutId();

  const { data, loading, refetch } = useQuery<any>(GET_CHECKOUT, {
    variables: { id: checkoutId },
    skip: !checkoutId,
    fetchPolicy: "cache-and-network",
  });

  const [createCheckout] = useMutation<any>(CREATE_CHECKOUT);
  const [addLines] = useMutation<any>(ADD_CHECKOUT_LINES);
  const [updateLine] = useMutation<any>(UPDATE_CHECKOUT_LINE);
  const [deleteLines] = useMutation<any>(DELETE_CHECKOUT_LINES);

  const checkout = data?.checkout ?? null;
  const lines = checkout?.lines ?? [];
  const totalItems = lines.reduce(
    (sum: number, line: { quantity: number }) => sum + line.quantity,
    0,
  );

  const addToCart = async (variantId: string, quantity: number = 1) => {
    const existingId = getCheckoutId();

    if (existingId) {
      const { data: addData } = await addLines({
        variables: {
          checkoutId: existingId,
          lines: [{ variantId, quantity }],
        },
      });
      if (addData?.checkoutLinesAdd?.errors?.length) {
        throw new Error(addData.checkoutLinesAdd.errors[0].message);
      }
    } else {
      const { data: createData } = await createCheckout({
        variables: {
          channel: DEFAULT_CHANNEL,
          lines: [{ variantId, quantity }],
        },
      });
      if (createData?.checkoutCreate?.errors?.length) {
        throw new Error(createData.checkoutCreate.errors[0].message);
      }
      const newId = createData?.checkoutCreate?.checkout?.id;
      if (newId) {
        setCheckoutId(newId);
      }
    }
    await refetch();
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    const id = getCheckoutId();
    if (!id) return;

    if (quantity <= 0) {
      await deleteLines({
        variables: { checkoutId: id, linesIds: [lineId] },
      });
    } else {
      await updateLine({
        variables: {
          checkoutId: id,
          lines: [{ lineId, quantity }],
        },
      });
    }
    await refetch();
  };

  const removeFromCart = async (lineId: string) => {
    const id = getCheckoutId();
    if (!id) return;

    await deleteLines({
      variables: { checkoutId: id, linesIds: [lineId] },
    });
    await refetch();
  };

  return {
    checkout,
    lines,
    totalItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    refetch,
  };
}
