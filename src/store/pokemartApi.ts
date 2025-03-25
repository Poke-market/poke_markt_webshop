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
import {
  UserData,
  RegisterResponse,
  AuthResponse,
  LoginCredentials,
} from "../types/auth";
import { ApiResponse } from "../types/types.ts";

// Base query with authentication
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL + "/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  responseHandler: async (response) => {
    const data = await response.json();
    return "data" in data ? data.data : data;
  },
});

// Base query without authentication
const baseQueryWithoutAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL + "/api",
  responseHandler: async (response) => {
    const data = await response.json();
    return "data" in data ? data.data : data;
  },
});

// Custom base query
const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    result = await baseQueryWithoutAuth(args, api, extraOptions);
  }
  return result;
};

// Define the API
const pokemartApi = createApi({
  reducerPath: "pokemartApi",
  baseQuery: customBaseQuery,
  tagTypes: ["wishlist"],
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
      query: (slug) => `/slugs/${slug}`,
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
      transformResponse: (response: ApiResponse): RegisterResponse => {
        return response.data as unknown as RegisterResponse;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => response,
    }),
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Wishlist
    getWishlist: builder.query<Item[], string>({
      query: (id) => `/users/${id}/wishlist`,
      providesTags: ["wishlist"],
    }),
    addToWishlist: builder.mutation<void, { userId: string; item: Item }>({
      query: ({ userId, item }) => ({
        url: `/users/${userId}/wishlist`,
        method: "POST",
        body: { itemId: item._id },
      }),
      invalidatesTags: ["wishlist"],
      onQueryStarted({ userId, item }, { dispatch, queryFulfilled }) {
        const optimisticUpdate = dispatch(
          pokemartApi.util.updateQueryData("getWishlist", userId, (draft) => {
            draft.push(item);
          }),
        );
        queryFulfilled.catch(optimisticUpdate.undo);
      },
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
      invalidatesTags: ["wishlist"],
      onQueryStarted({ userId, itemId }, { dispatch, queryFulfilled }) {
        const optimisticUpdate = dispatch(
          pokemartApi.util.updateQueryData("getWishlist", userId, (draft) => {
            return draft.filter((item) => item._id !== itemId);
          }),
        );
        queryFulfilled.catch(optimisticUpdate.undo);
      },
    }),
    clearWishlist: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/users/${userId}/wishlist/clear`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
      onQueryStarted(userId, { dispatch, queryFulfilled }) {
        const optimisticUpdate = dispatch(
          pokemartApi.util.updateQueryData("getWishlist", userId, () => {
            return [];
          }),
        );
        queryFulfilled.catch(optimisticUpdate.undo);
      },
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
  useClearWishlistMutation,
  useLoginMutation,
} = pokemartApi;

export default pokemartApi;
