import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetItemsData, Item, GetItemsParams } from "../types/apiTypes/item";
import { apiResponse } from "../types/apiTypes/response";

const pokemartApi = createApi({
  reducerPath: "pokemartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/api",
    responseHandler: async (response) => {
      const data = (await response.json()) as apiResponse;
      return "data" in data ? data.data : data;
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
    getItemBySlug: builder.query<Item, string>({
      query: (slug) => ({
        url: "/items",
        params: { slug },
      }),
      transformResponse: (response: { items: Item[] }) => response.items[0],
    }),
    getTags: builder.query<string[], void>({
      query: () => "/tags",
      transformResponse: (response: { name: string }[]) =>
        response.map((tag) => tag.name),
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useGetItemBySlugQuery,
  useGetTagsQuery,
} = pokemartApi;
export default pokemartApi;
