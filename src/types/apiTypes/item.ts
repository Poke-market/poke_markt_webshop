import { paginationInfo } from "./info";

/********************************
 *           TYPES              *
 ********************************/

export type Item = {
  _id: string;
  category: Category;
  description: string;
  name: string;
  photoUrl: string;
  price: number;
  tags: string[];
  discount: {
    amount: number;
    type: string;
    discountedPrice: number;
    hasDiscount: boolean;
  };
  isNewItem: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

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
] as const;

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
    count: number;
    categorieCount: Record<Category, number>;
    priceRange: PriceRange;
  };
  items: Item[];
};

export type GetItemsParams = {
  cat?: Category[];
  tag?: string[];
  minPrice?: number;
  maxPrice?: number;
  minDiscountedPrice?: number;
  maxDiscountedPrice?: number;
  sort?: "price" | "name";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
};
