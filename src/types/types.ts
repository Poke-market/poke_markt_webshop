import { Item } from "./apiTypes/item";

export interface ApiResponse {
  status: string;
  data: {
    info: {
      count: number;
      page: number;
      pages: number;
      prev: string | null;
      next: string | null;
      first: string;
      last: string;
    };
    items: Item[];
  };
}

export interface ProductInfoProps {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  id: string;
  category: string;
  tags: string[];
  images: string[];
}
