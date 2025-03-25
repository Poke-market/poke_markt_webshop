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
      query: (slug) => `/slugs/${slug}`,
      transformResponse: (response: { item: Item }) => response.item,
    }),
    getTags: builder.query<string[], void>({
      query: () => "/tags",
      transformResponse: (response: { name: string }[]) =>
        response.map((tag) => tag.name),
    }),
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
  }),
});

export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useRegisterMutation,
  useGetItemBySlugQuery,
  useGetTagsQuery,
  useLoginMutation,
} = pokemartApi;

export default pokemartApi;
