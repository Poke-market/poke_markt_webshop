import { Props } from "../components/home/ProductCard.tsx";
import { Item } from "../types/apiTypes/item";

export const transformData = (items: Item[]): Props[] => {
  return items.map((item) => ({
    item,
  }));
};
