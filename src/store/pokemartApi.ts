import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getItemsData, Item } from "../types/apiTypes/item";
import { apiResponse } from "../types/apiTypes/response";

const pokemartApi = createApi({
  reducerPath: "pokemartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.DEV
      ? "http://127.0.0.1:3000/api"
      : "https://poke-market-backend-dev-rgj5.onrender.com/api",
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
  }),
});

export const { useGetItemsQuery, useGetItemByIdQuery } = pokemartApi;
export default pokemartApi;
