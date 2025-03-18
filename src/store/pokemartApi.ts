import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getItemsData, Item } from "../types/apiTypes/item";
import { apiResponse } from "../types/apiTypes/response";
import { RegisterFormData, RegisterResponse } from "../types/apiTypes/auth";

const pokemartApi = createApi({
  reducerPath: "pokemartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    responseHandler: async (response) => {
      const data = (await response.json()) as apiResponse;
      return data.data;
    },
  }),
  endpoints: (builder) => ({
    getItems: builder.query<getItemsData, void>({
      query: () => "/items",
    }),
    getItemById: builder.query<Item, Item["_id"]>({
      query: (id) => `/items/${id}`,
      transformResponse: (response: { item: Item }) => response.item,
    }),
    register: builder.mutation<RegisterResponse, RegisterFormData>({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useGetItemsQuery, useGetItemByIdQuery, useRegisterMutation } =
  pokemartApi;
export default pokemartApi;
