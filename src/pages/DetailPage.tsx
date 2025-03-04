import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductInfo";
import Loading from "../components/Loading";
import Heading from "../components/Headingtxt";
import styles from "../scss/components/DetailPage.module.scss";
import { Product, ApiListResponse, ApiSingleResponse } from "../types/types";

const normalizeText = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const DetailPage = () => {
  const { name } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const searchName = name?.replace(/-/g, " ");
        let allProducts: Product[] = [];
        let currentPage = 1;
        let hasMorePages = true;

        const recommendationsResponse = await fetch(
          `https://poke-market-backend-dev-rgj5.onrender.com/api/items?page=1&limit=5`,
        );
        if (!recommendationsResponse.ok)
          throw new Error("Failed to fetch recommendations");
        const recommendationsResult =
          (await recommendationsResponse.json()) as ApiListResponse;

        if (recommendationsResult?.data?.items) {
          setAvailableProducts(recommendationsResult.data.items);
        }

        // Then search for the specific product
        while (hasMorePages) {
          const response = await fetch(
            `https://poke-market-backend-dev-rgj5.onrender.com/api/items?page=${currentPage}`,
          );
          if (!response.ok) throw new Error("Failed to fetch products");
          const result = (await response.json()) as ApiListResponse;

          if (!result?.data?.items) {
            throw new Error("Invalid API response structure");
          }

          allProducts = [...allProducts, ...result.data.items];

          hasMorePages = currentPage < result.data.info.pages;
          currentPage++;

          const matchingProduct = result.data.items.find((item: Product) => {
            if (!item?.name) return false;
            const normalizedItemName = normalizeText(item.name);
            const normalizedSearchTerm = normalizeText(searchName ?? "");
            return normalizedItemName === normalizedSearchTerm;
          });

          if (matchingProduct) {
            const productResponse = await fetch(
              `https://poke-market-backend-dev-rgj5.onrender.com/api/items/${matchingProduct._id}`,
            );
            if (!productResponse.ok) throw new Error("Failed to fetch product");
            const productResult =
              (await productResponse.json()) as ApiSingleResponse;

            if (!productResult?.data?.item) {
              throw new Error("Invalid product data received");
            }

            if (productResult.status === "success") {
              setProduct(productResult.data.item);
              return;
            } else {
              throw new Error("Product fetch was not successful");
            }
          }
        }

        setProduct(null);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    void fetchProduct();
  }, [name]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className={styles.productDetail}>
        <div className={styles.notFound}>
          <Heading as="h2" size="textmd" className={styles.notFoundTitle}>
            Product not found
          </Heading>
          <p>Sorry, we couldn't find a product matching "{name}".</p>
          {availableProducts.length > 0 && (
            <div className={styles.availableProducts}>
              <Heading
                as="h3"
                size="textlg"
                className={styles.recommendationsTitle}
              >
                Recommended Products:
              </Heading>
              <ul>
                {availableProducts.map((item) => (
                  <li key={item._id}>
                    <a
                      href={`/product/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <ProductInfo
        name={product.name}
        description={product.description}
        price={
          product.discount && product.discount.discountedPrice !== product.price
            ? product.discount.discountedPrice
            : product.price
        }
        originalPrice={
          product.discount && product.discount.discountedPrice !== product.price
            ? product.price
            : undefined
        }
        id={product._id}
        category={product.category}
        tags={product.tags}
        images={[product.photoUrl]}
      />
    </>
  );
};

export default DetailPage;
