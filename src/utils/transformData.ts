import { ProductProps } from "../types/types.ts";

interface ProductData {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  discount?: number;
}

// product data from the API has to include a discount value to be able to give a discount for the product
export const transformData = (data: ProductData[]): ProductProps[] => {
  return data.map((product) => {
    const discount = product.discount ?? 30;
    const originalPrice = product.price + (product.price * discount) / 100;
    return {
      id: product.id,
      name: product.title,
      title: product.title,
      description: product.description,
      image: product.image,
      currentPrice: `€${product.price}`,
      originalPrice: `€${originalPrice.toFixed(2)}`,
      discountText: `-${discount}%`,
      price: product.price,
    };
  });
};
