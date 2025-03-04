import { Props } from "../components/ProductCard.tsx";

export const transformData = (
  items: {
    _id: string;
    name: string;
    description: string;
    photoUrl: string;
    price: number;
  }[],
): Props[] => {
  return items.map((item) => ({
    id: item._id,
    name: item.name,
    description: item.description,
    image: item.photoUrl,
    price: item.price,
    currentPrice: `$${item.price}`,
    originalPrice: `$${item.price + 300}`,
    discountText: "30% ",
  }));
};
