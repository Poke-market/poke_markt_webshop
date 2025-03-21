import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetItemsData, Item, GetItemsParams } from "../types/apiTypes/item";

interface ApiSuccessResponse<T> {
  status: "success";
  data: T;
}

interface ApiErrorResponse {
  status: "error" | "fail";
  message?: string;
  data?: {
    errors: string[];
  };
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

interface TagResponse {
  _id: string;
  name: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

const pokemartApi = createApi({
  reducerPath: "pokemartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/api",
  }),
  endpoints: (builder) => ({
    getItems: builder.query<GetItemsData, GetItemsParams>({
      query: (params: Partial<GetItemsParams> = {}) => {
        const { tag, cat, ...rest } = params;
        const tagArray = tag ? (Array.isArray(tag) ? tag : [tag]) : undefined;
        const catArray = cat ? (Array.isArray(cat) ? cat : [cat]) : undefined;
        const queryParams = {
          ...rest,
          tag: tagArray?.join(","),
          cat: catArray?.join(","),
        } as const;
        return {
          url: "/items",
          params: queryParams,
        };
      },
      transformResponse: (baseResponse: unknown) => {
        const response = baseResponse as ApiResponse<GetItemsData>;
        if (response.status === "success" && response.data) {
          return response.data;
        }
        throw new Error("Failed to fetch items");
      },
    }),
    getItemById: builder.query<Item, Item["_id"]>({
      query: (id) => `/items/${id}`,
      transformResponse: (baseResponse: unknown) => {
        const response = baseResponse as ApiResponse<{ item: Item }>;
        if (response.status === "success" && response.data?.item) {
          return response.data.item;
        }
        throw new Error("Failed to fetch item");
      },
    }),
    getItemBySlug: builder.query<Item, string>({
      query: (slug) => `/slug/${slug}`,
      transformResponse: (baseResponse: unknown) => {
        const response = baseResponse as ApiResponse<{ item: Item }>;
        if (response.status === "success" && response.data?.item) {
          return response.data.item;
        }
        throw new Error("Failed to fetch item");
      },
    }),
    getTags: builder.query<string[], void>({
      query: () => "/tags",
      transformResponse: (response: TagResponse[]) => {
        return response.map((tag) => tag.name);
      },
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
