import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { Item, GetItemsParams, GetItemsData } from "../types/apiTypes/item";
import { RootState } from "./index";
import { UserData, RegisterResponse } from "../types/auth";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL + "/api",
  responseHandler: async (response) => {
    const data = await response.json();
    return "data" in data ? data.data : data;
  },
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithoutAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL + "/api",
  responseHandler: async (response) => {
    const data = await response.json();
    return "data" in data ? data.data : data;
  },
});

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);
  if (result.error) {
    console.log("API Error:", result.error);
  }
  if (result.error && result.error.status === 401) {
    result = await baseQueryWithoutAuth(args, api, extraOptions);
  }
  return result;
};

const pokemartApi = createApi({
  reducerPath: "pokemartApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    // Items
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
      query: (slug) => `/slug/${slug}`,
      transformResponse: (response: { item: Item }) => response.item,
    }),
    getTags: builder.query<string[], void>({
      query: () => "/tags",
      transformResponse: (response: { name: string }[]) =>
        response.map((tag) => tag.name),
    }),

    // Auth
    register: builder.mutation<RegisterResponse, UserData>({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    // Wishlist
    getWishlist: builder.query<Item[], string>({
      query: (id) => `/users/${id}/wishlist`,
    }),
    addToWishlist: builder.mutation<void, { userId: string; itemId: string }>({
      query: ({ userId, itemId }) => ({
        url: `/users/${userId}/wishlist`,
        method: "POST",
        body: { itemId },
      }),
    }),
    removeFromWishlist: builder.mutation<
      void,
      { userId: string; itemId: string }
    >({
      query: ({ userId, itemId }) => ({
        url: `/users/${userId}/wishlist`,
        method: "DELETE",
        body: { itemId },
      }),
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useRegisterMutation,
  useGetItemBySlugQuery,
  useGetTagsQuery,
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = pokemartApi;
export default pokemartApi;
