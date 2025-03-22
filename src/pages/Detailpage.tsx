import { Breadcrumb, Related, Loading, ProductInfo } from "../utils";
import { useParams } from "react-router-dom";
import { useGetItemsQuery, useGetItemBySlugQuery } from "../store/pokemartApi";
import ProductNotFound from "../components/detailpage/ProductNotFound";

const DetailPage = () => {
  const { slug } = useParams();
  const { data: Item, isLoading: loading } = useGetItemBySlugQuery(slug ?? "", {
    skip: !slug,
  });
  const { data: availableProductsData } = useGetItemsQuery({
    page: 1,
    limit: 5,
  });

  if (loading) {
    return <Loading />;
  }

  if (!Item) {
    return (
      <ProductNotFound
        name={slug ?? ""}
        availableProducts={availableProductsData?.items ?? []}
      />
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
