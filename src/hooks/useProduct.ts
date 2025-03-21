import { useGetItemBySlugQuery, useGetItemsQuery } from "../store/pokemartApi";
import { Item, GetItemsParams } from "../types/apiTypes/item";

// Fisher-Yates shuffle algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

interface ProductHookResult {
  product: Item | null;
  loading: boolean;
  availableProducts: Item[];
}

export const useProduct = (slug: string | undefined): ProductHookResult => {
  const { data: product, isLoading: loading } = useGetItemBySlugQuery(
    slug ?? "not-found",
    {
      skip: !slug,
    },
  );

  //to see other products in the same category or with the same tags (related products)
  const { data: itemsData } = useGetItemsQuery({} as GetItemsParams, {
    selectFromResult: ({ data }) => ({
      data: data as { items: Item[] } | undefined,
    }),
  });

  const items = itemsData?.items ?? [];

  const relatedItems = items
    .filter((item: Item) => {
      if (!product) return true;
      if (item._id === product._id) return false;
      return (
        item.category === product.category ||
        item.tags.some((tag) => product.tags.includes(tag))
      );
    })
    .sort((a: Item, b: Item) => {
      if (!product) return 0;
      const aMatchesBoth =
        a.category === product.category &&
        a.tags.some((tag) => product.tags.includes(tag));
      const bMatchesBoth =
        b.category === product.category &&
        b.tags.some((tag) => product.tags.includes(tag));

      if (aMatchesBoth && !bMatchesBoth) return -1;
      if (!aMatchesBoth && bMatchesBoth) return 1;
      return 0;
    });

  const availableProducts = shuffleArray(relatedItems).slice(0, 4);

  return {
    product: product ?? null,
    loading,
    availableProducts,
  };
};
