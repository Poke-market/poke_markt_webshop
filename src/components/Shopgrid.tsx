import styles from "../scss/components/shopGrid.module.scss";
import { Suspense, useState, useEffect } from "react";
import { Button, LoadingSkeleton, ProductCard } from "../utils";
import { transformData } from "../utils/transformData";
import { ProductProps } from "../types/types.ts";

interface ShopGrid {
  data?: ProductProps[];
}

const ShopGrid = ({ data: initialData = [] }: ShopGrid) => {
  const [data, setData] = useState<ProductProps[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  useEffect(() => {
    if (initialData.length > 0) return;

    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        const transformedData = transformData(result);
        setData(transformedData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [initialData]);

  // Scroll up when my page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(data.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <LoadingSkeleton />;
  if (error)
    return (
      <div className={styles.errorMessage}>
        Error: {error}
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );

  return (
    <div className={styles.shopContainer}>
      <div className={styles.flexContainer}>
        <div className={styles.backgroundBox} />
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.gridContainer}>
              <Suspense fallback={<LoadingSkeleton />}>
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    className="w-full"
                  />
                ))}
              </Suspense>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                color="deep_orange_50"
                size="3x1"
                variant="fill"
                className={styles.button}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={`page-${index + 1}`}
                  color={
                    currentPage === index + 1 ? "lime_800" : "deep_orange_50"
                  }
                  size="3x1"
                  variant="fill"
                  className={styles.button}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                color="deep_orange_50"
                size="3x1"
                variant="fill"
                className={styles.button}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopGrid;
