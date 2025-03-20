import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getItemsData, Item, GetItemsParams } from "../types/apiTypes/item";
import { apiResponse } from "../types/apiTypes/response";
import { RootState } from "./index";
import { AuthResponse, LoginCredentials } from "../types/auth";

const pokemartApi = createApi({
  reducerPath: "pokemartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    responseHandler: async (response) => {
      const data = (await response.json()) as apiResponse;
      return data.data;
    },
  }),
  endpoints: (builder) => ({
    getItems: builder.query<getItemsData, GetItemsParams>({
      query: ({ page }) => {
        return `/items?page=${page}`;
      },
    }),
    getItemById: builder.query<Item, Item["_id"]>({
      query: (id) => `/items/${id}`,
      transformResponse: (response: { item: Item }) => response.item,
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useRegisterMutation,
  useLoginMutation,
} = pokemartApi;
export default pokemartApi;
