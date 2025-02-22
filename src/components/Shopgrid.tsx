import { Suspense, useState, useEffect } from "react";
import styles from "../scss/components/shopGrid.module.scss";
import ProductCard from "./ProductCard";
import { ProductProps } from "../types/types.ts";

interface ShopColumnOneProps {
  data?: ProductProps[];
}

const ShopColumnOne = ({ data: initialData = [] }: ShopColumnOneProps) => {
  const [data, setData] = useState<ProductProps[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [error, setError] = useState<string | null>(null);
  const [currentPage] = useState(1);
  const productsPerPage = 16;

  useEffect(() => {
    if (initialData.length > 0) return;

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/pokemon-cards");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialData]);

  // get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.shopContainer}>
      <div className={styles.flexContainer}>
        {/* Background box */}
        <div className={styles.backgroundBox} />

        {/* Main content container */}
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            {/* Grid container for product cards */}
            <div className={styles.gridContainer}>
              <Suspense fallback={<div>Loading feed...</div>}>
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    className="w-full"
                  />
                ))}
              </Suspense>
            </div>
            {/* Pagination controls */}
            <div className={styles.buttonContainer}>
              {/* Previous button */}
              <button>Previous</button>
              {/* numbers of pages*/}
              <button>index + 1</button>
              {/* Next button */}
              <button>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopColumnOne;
