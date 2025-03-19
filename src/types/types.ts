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
    items: {
      _id: string;
      name: string;
      description: string;
      photoUrl: string;
      price: number;
      category: string;
      tags: string[];
      createdAt: string;
      updatedAt: string;
    }[];
  };
}

export interface Product {
  isNewItem: boolean;
  _id: string;
  name: string;
  description: string;
  photoUrl: string;
  price: number;
  category: string;
  tags: string[];
  __v: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  discount: {
    amount: number;
    type: string;
    discountedPrice: number;
    hasDiscount: boolean;
  };
}

export interface ApiListResponse {
  status: string;
  data: {
    items: Product[];
    info: {
      pages: number;
    };
  };
}

export interface ApiSingleResponse {
  status: string;
  data: {
    item: Product;
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
