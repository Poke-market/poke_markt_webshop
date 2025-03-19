import { useGetItemBySlugQuery, useGetItemsQuery } from "../store/pokemartApi";

// Fisher-Yates shuffle algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useProduct = (slug: string | undefined) => {
  const { data: product, isLoading: loading } = useGetItemBySlugQuery(
    slug ?? "not-found",
    {
      skip: !slug,
    },
  );

  const { data: itemsData } = useGetItemsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.items
        .filter((item) => {
          if (!product) return true;
          if (item._id === product._id) return false;
          return (
            item.category === product.category ||
            item.tags.some((tag) => product.tags.includes(tag))
          );
        })
        .slice(0, 4),
    }),
  });

  return {
    product: product ?? null,
    loading,
    availableProducts: itemsData ? shuffleArray(itemsData).slice(0, 4) : [],
  };
};
