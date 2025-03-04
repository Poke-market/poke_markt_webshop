import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDisplay from "../components/ProductDisplay";
import ProductInfo from "../components/ProductInfo";
import styles from "../scss/components/DetailPage.module.scss";

interface Product {
  isNewItem: boolean;
  _id: string;
  name: string;
  description: string;
  photoUrl: string;
  price: number;
  category: string;
  tags: string[];
  __v: number;
  createdAt: string;
  updatedAt: string;
  discount: {
    amount: number;
    type: string;
    discountedPrice: number;
    hasDiscount: boolean;
  };
}

interface ApiListResponse {
  status: string;
  data: {
    items: Product[];
    info: {
      pages: number;
    };
  };
}

interface ApiSingleResponse {
  status: string;
  data: {
    item: Product;
  };
}

// Function to normalize text by removing diacritics
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

        // Fetch all pages until we find the product or run out of pages
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

          // Check if we have more pages
          hasMorePages = currentPage < result.data.info.pages;
          currentPage++;

          // Find the product with matching name
          const matchingProduct = result.data.items.find((item: Product) => {
            if (!item?.name) return false;
            const normalizedItemName = normalizeText(item.name);
            const normalizedSearchTerm = normalizeText(searchName ?? "");
            return normalizedItemName === normalizedSearchTerm;
          });

          if (matchingProduct) {
            // If found, fetch the specific product by ID
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

        // If we get here, we've checked all pages and didn't find the product
        setAvailableProducts(allProducts);
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
    return <div>Loading...</div>;
  }

  if (!product) {
    return (
      <div className={styles.productDetail}>
        <div className={styles.notFound}>
          <h2>Product not found</h2>
          <p>Sorry, we couldn't find a product matching "{name}".</p>
          <div className={styles.availableProducts}>
            <h3>Available Products:</h3>
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
        </div>
      </div>
    );
  }

  // Create an array of images, using the product's photoUrl
  const images = [product.photoUrl];

  return (
    <div className={styles.productDetail}>
      <ProductDisplay images={images} name={product.name} />
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
      />
    </div>
  );
};

export default DetailPage;
