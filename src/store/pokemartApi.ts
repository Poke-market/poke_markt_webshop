import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getItemsData, GetItemsParams, Item } from "../types/apiTypes/item";
import { apiResponse } from "../types/apiTypes/response";
import { RootState } from "./index";

const pokemartApi = createApi({
  reducerPath: "pokemartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/api",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth?.token;

      if (token && typeof token === "string") {
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
  }),
});

export const { useGetItemsQuery, useGetItemByIdQuery, useRegisterMutation } =
  pokemartApi;
export default pokemartApi;
