import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetItemsQuery, useGetItemBySlugQuery } from "../store/pokemartApi";
import { getRandomItems } from "../utils/arrayUtils";

export const useDetailPage = () => {
  const { slug } = useParams();

  // Fetch the item by slug
  const { data: Item, isLoading: loading } = useGetItemBySlugQuery(slug ?? "", {
    skip: !slug,
  });

  // Fetch total count of items for pagination
  const { data: countData } = useGetItemsQuery({
    page: 1,
    limit: 1,
  });

  // Fetch all products if countData is available
  const { data: allProductsData } = useGetItemsQuery(
    {
      page: 1,
      limit: countData?.info.count ?? 1,
    },
    {
      skip: !countData?.info.count,
    },
  );

  // Generate random products for the "Related" section
  const randomProducts = useMemo(() => {
    if (!allProductsData?.items) return [];
    return getRandomItems(allProductsData.items, 5);
  }, [allProductsData?.items]);

  return {
    Item,
    loading,
    slug,
    randomProducts,
  };
};
