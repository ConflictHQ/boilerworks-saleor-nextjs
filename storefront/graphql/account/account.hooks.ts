"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import { DEFAULT_CHANNEL } from "@/lib/constants";
import { GET_ME, GET_MY_ORDERS, GET_ORDER_BY_TOKEN } from "./account.queries";
import {
  TOKEN_CREATE,
  TOKEN_REFRESH,
  REGISTER,
  UPDATE_ACCOUNT,
  CREATE_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  SET_DEFAULT_ADDRESS,
} from "./account.mutations";
import type {
  GetMeData,
  GetMyOrdersData,
  GetMyOrdersVariables,
  GetOrderByTokenData,
  GetOrderByTokenVariables,
  TokenCreateData,
  TokenCreateVariables,
  TokenRefreshData,
  TokenRefreshVariables,
  RegisterData,
  RegisterVariables,
  UpdateAccountData,
  UpdateAccountVariables,
  CreateAddressData,
  CreateAddressVariables,
  UpdateAddressData,
  UpdateAddressVariables,
  DeleteAddressData,
  DeleteAddressVariables,
  SetDefaultAddressData,
  SetDefaultAddressVariables,
  AddressInput,
} from "./account.types";

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export const useMe = () => {
  return useQuery<GetMeData>(GET_ME, {
    fetchPolicy: "cache-and-network",
  });
};

export const useMyOrders = (first?: number, after?: string | null) => {
  return useQuery<GetMyOrdersData, GetMyOrdersVariables>(GET_MY_ORDERS, {
    variables: { first, after },
    fetchPolicy: "cache-and-network",
  });
};

export const useOrderByToken = (token: string) => {
  return useQuery<GetOrderByTokenData, GetOrderByTokenVariables>(GET_ORDER_BY_TOKEN, {
    variables: { token },
    fetchPolicy: "cache-and-network",
    skip: !token,
  });
};

// ---------------------------------------------------------------------------
// Auth mutations
// ---------------------------------------------------------------------------

export const useTokenCreate = () => {
  const [tokenCreate, result] = useMutation<TokenCreateData, TokenCreateVariables>(TOKEN_CREATE);

  const execute = (email: string, password: string) =>
    tokenCreate({
      variables: { email, password },
    });

  return { tokenCreate: execute, ...result };
};

export const useTokenRefresh = () => {
  const [tokenRefresh, result] = useMutation<TokenRefreshData, TokenRefreshVariables>(
    TOKEN_REFRESH,
  );

  const execute = (refreshToken: string) =>
    tokenRefresh({
      variables: { refreshToken },
    });

  return { tokenRefresh: execute, ...result };
};

export const useRegister = () => {
  const [register, result] = useMutation<RegisterData, RegisterVariables>(REGISTER);

  const execute = (input: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    redirectUrl?: string;
  }) =>
    register({
      variables: {
        ...input,
        channel: DEFAULT_CHANNEL,
      },
    });

  return { register: execute, ...result };
};

// ---------------------------------------------------------------------------
// Account mutations
// ---------------------------------------------------------------------------

export const useUpdateAccount = () => {
  const [updateAccount, result] = useMutation<UpdateAccountData, UpdateAccountVariables>(
    UPDATE_ACCOUNT,
  );

  const execute = (input: { firstName?: string; lastName?: string }) =>
    updateAccount({
      variables: input,
    });

  return { updateAccount: execute, ...result };
};

// ---------------------------------------------------------------------------
// Address mutations
// ---------------------------------------------------------------------------

export const useCreateAddress = () => {
  const [createAddress, result] = useMutation<CreateAddressData, CreateAddressVariables>(
    CREATE_ADDRESS,
  );

  const execute = (input: AddressInput) =>
    createAddress({
      variables: { input },
    });

  return { createAddress: execute, ...result };
};

export const useUpdateAddress = () => {
  const [updateAddress, result] = useMutation<UpdateAddressData, UpdateAddressVariables>(
    UPDATE_ADDRESS,
  );

  const execute = (id: string, input: AddressInput) =>
    updateAddress({
      variables: { id, input },
    });

  return { updateAddress: execute, ...result };
};

export const useDeleteAddress = () => {
  const [deleteAddress, result] = useMutation<DeleteAddressData, DeleteAddressVariables>(
    DELETE_ADDRESS,
  );

  const execute = (id: string) =>
    deleteAddress({
      variables: { id },
    });

  return { deleteAddress: execute, ...result };
};

export const useSetDefaultAddress = () => {
  const [setDefault, result] = useMutation<SetDefaultAddressData, SetDefaultAddressVariables>(
    SET_DEFAULT_ADDRESS,
  );

  const execute = (id: string, type: "BILLING" | "SHIPPING") =>
    setDefault({
      variables: { id, type },
    });

  return { setDefaultAddress: execute, ...result };
};
