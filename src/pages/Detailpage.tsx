import { Breadcrumb, Related, Loading, ProductInfo } from "../utils";
import { useParams } from "react-router-dom";
import { useGetItemsQuery, useGetItemBySlugQuery } from "../store/pokemartApi";
import ProductNotFound from "../components/detailpage/ProductNotFound";
import { useMemo, useEffect } from "react";
import { getRandomItems } from "../utils/arrayUtils";

const DetailPage = () => {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const { data: Item, isLoading: loading } = useGetItemBySlugQuery(slug ?? "", {
    skip: !slug,
  });

  const { data: countData } = useGetItemsQuery({
    page: 1,
    limit: 1,
  });

  const { data: allProductsData } = useGetItemsQuery(
    {
      page: 1,
      limit: countData?.info.count ?? 1,
    },
    {
      skip: !countData?.info.count,
    },
  );

  const randomProducts = useMemo(() => {
    if (!allProductsData?.items) return [];
    return getRandomItems(allProductsData.items, 5);
  }, [allProductsData?.items]);

  if (loading) {
    return <Loading />;
  }

  if (!Item) {
    return (
      <ProductNotFound name={slug ?? ""} availableProducts={randomProducts} />
    );
  }

  return (
    <>
      <Breadcrumb />
      <ProductInfo product={Item} />
      <Related />
    </>
  );
};

export default DetailPage;
