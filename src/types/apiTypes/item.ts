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
  __v: number;
  createdAt: Date;
  updatedAt: Date;
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

/********************************
 *           RESPONSES          *
 ********************************/

export type getItemsData = {
  info: paginationInfo & {
    categorieCount: Record<Category, number>;
  };
  items: Item[];
};

export type getItemData = {
  item: Item;
};

// filter valid params

export type GetItemsParams = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  cat?: Category[];
  tag?: string[];
};
