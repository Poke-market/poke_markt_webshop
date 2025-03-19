import { useGetItemBySlugQuery, useGetItemsQuery } from "../store/pokemartApi";

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
        .slice(0, 5),
    }),
  });

  return {
    product: product ?? null,
    loading,
    availableProducts: itemsData ?? [],
  };
};
