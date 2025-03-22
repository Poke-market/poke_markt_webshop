import { Breadcrumb, Related, Loading, ProductInfo } from "../utils";
import { useParams } from "react-router-dom";
import { useGetItemsQuery, useGetItemBySlugQuery } from "../store/pokemartApi";
import ProductNotFound from "../components/detailpage/ProductNotFound";

const DetailPage = () => {
  const { slug } = useParams();
  const {
    data: product,
    isLoading: loading,
    error,
  } = useGetItemBySlugQuery(slug ?? "", {
    skip: !slug,
  });
  const { data: availableProductsData } = useGetItemsQuery({
    page: 1,
    limit: 5,
  });

  console.log("Slug:", slug);
  console.log("Product:", product);
  console.log("Error:", error);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
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
      <ProductInfo product={product} />
      <Related />
    </>
  );
};

export default DetailPage;
