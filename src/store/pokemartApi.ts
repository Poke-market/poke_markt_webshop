import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getItemsData, Item } from "../types/apiTypes/item";
import { apiResponse } from "../types/apiTypes/response";

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

    // register:
    register: builder.mutation<
      { token: string },
      {
        email: string;
        password: string;
        firstname: string;
        lastname: string;
        city: string;
        street: string;
        housenumber: string;
        zipcode: string;
        telephone: string;
        isAdmin?: boolean;
      }
    >({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useGetItemsQuery, useGetItemByIdQuery, useRegisterMutation } =
  pokemartApi;
