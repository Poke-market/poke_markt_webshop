import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetItemsData, Item, GetItemsParams } from "../types/apiTypes/item";
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
    getItems: builder.query<GetItemsData, GetItemsParams>({
      query: (params) => ({
        url: "/items",
        params: {
          ...params,
          tag: params.tag?.join(","),
          cat: params.cat?.join(","),
        },
      }),
    }),
    getItemById: builder.query<Item, Item["_id"]>({
      query: (id) => `/items/${id}`,
      transformResponse: (response: { item: Item }) => response.item,
    }),
  }),
});

export const { useGetItemsQuery, useGetItemByIdQuery } = pokemartApi;
export default pokemartApi;
