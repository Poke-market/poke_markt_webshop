import { Breadcrumb, Related, Loading, ProductInfo } from "../utils";
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import ProductNotFound from "../components/detailpage/ProductNotFound";
const DetailPage = () => {
  const { name } = useParams();
  const { product, loading, availableProducts } = useProduct(name);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <ProductNotFound
        name={name ?? ""}
        availableProducts={availableProducts}
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
