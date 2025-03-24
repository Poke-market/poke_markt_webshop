import { Breadcrumb, Related, Loading, ProductInfo } from "../utils";
import ProductNotFound from "../components/detailpage/ProductNotFound";
import { useDetailPage } from "../hooks/useDetailPage"; // Custom hook for logic

const DetailPage = () => {
  const { Item, loading, slug, randomProducts } = useDetailPage();

  if (loading) return <Loading />;
  if (!Item)
    return (
      <ProductNotFound name={slug ?? ""} availableProducts={randomProducts} />
    );

  return (
    <>
      <Breadcrumb />
      <ProductInfo product={Item} />
      <Related
        currentProduct={{
          _id: "",
          category: "medicine",
          description: "",
          name: "",
          photoUrl: "",
          price: 0,
          tags: [],
          discount: {
            amount: 0,
            type: "",
            discountedPrice: 0,
            hasDiscount: false,
          },
          isNewItem: false,
          slug: "",
          createdAt: "",
          updatedAt: "",
          __v: 0,
        }}
      />
    </>
  );
};

export default DetailPage;
