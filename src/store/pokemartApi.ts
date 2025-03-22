import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getItemsData, Item, GetItemsParams } from "../types/apiTypes/item";
import { ApiResponse } from "../types/apiTypes/response";
import { RootState } from "./index";
import { AuthResponse, LoginCredentials } from "../types/auth";
import { UserData, RegisterResponse } from "../types/auth";
import { ErrorResponse } from "../types/auth";

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
  }),
  endpoints: (builder) => ({
    getItems: builder.query<getItemsData, GetItemsParams>({
      query: ({ page }) => {
        return `/items?page=${page}`;
      },
      transformResponse: (response: ApiResponse): getItemsData => {
        return response.data as getItemsData;
      },
      transformErrorResponse: (response: FetchBaseQueryError | ErrorResponse) =>
        response,
    }),
    getItemById: builder.query<Item, Item["_id"]>({
      query: (id) => `/items/${id}`,
      transformResponse: (response: ApiResponse): Item => {
        if (
          response.data &&
          typeof response.data === "object" &&
          "item" in response.data
        ) {
          return response.data.item as Item;
        }
        throw new Error("Item not found in response");
      },
      transformErrorResponse: (response: FetchBaseQueryError | ErrorResponse) =>
        response,
    }),
    register: builder.mutation<RegisterResponse, UserData>({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: ApiResponse): RegisterResponse => {
        return response.data as RegisterResponse;
      },
      transformErrorResponse: (response: FetchBaseQueryError | ErrorResponse) =>
        response,
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
