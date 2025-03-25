import { Breadcrumb, Related, Loading, ProductInfo } from "../utils";
import ProductNotFound from "../components/detailpage/ProductNotFound";
import { useDetailPage } from "../hooks/useDetailPage"; // Custom hook for logic
import { useEffect } from "react";

const DetailPage = () => {
  const { Item, loading, slug, randomProducts } = useDetailPage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return <Loading />;
  if (!Item)
    return (
      <ProductNotFound name={slug ?? ""} availableProducts={randomProducts} />
    );

  return (
    <>
      <Breadcrumb />
      <ProductInfo product={Item} />
      <Related currentProduct={Item} />
    </>
  );
};

export default DetailPage;
