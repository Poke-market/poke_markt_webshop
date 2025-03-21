import { paginationInfo } from "./info";

/********************************
 *           TYPES              *
 ********************************/

export interface Item {
  _id: string;
  category: Category;
  description: string;
  name: string;
  photoUrl: string;
  price: number;
  tags: string[];
  isNewItem: boolean;
  discount: Discount;
  slug: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface Discount {
  amount: number;
  type: string;
  discountedPrice: number;
  hasDiscount: boolean;
}

export const categories = [
  "medicine",
  "berries",
  "food",
  "pokéballs",
  "evolution",
  "vitamins",
  "tm/hm",
  "mega stones",
] as const; // as const so that we can generate types from it

// Create a string union type from the categories array values
export type Category = (typeof categories)[number];
export type PriceRange = {
  min: number;
  max: number;
};

/********************************
 *           RESPONSES          *
 ********************************/

export type GetItemsData = {
  info: paginationInfo & {
    categorieCount: Record<Category, number>;
    priceRange: PriceRange;
  };
  items: Item[];
};

export type GetItemData = {
  item: Item;
};

/********************************
 *           PARAMS             *
 ********************************/

export type GetItemsParams = {
  page?: number;
  limit?: number;
  cat?: Category[];
  tag?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: "price" | "name";
  order?: "asc" | "desc";
};
