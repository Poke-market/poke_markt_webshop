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

  // Added state to track screen size so when the screen size is less than 1024px, the number of products per page is reduced to 15 instead of 16 to avoid overflow.
  const [productsPerPage, setProductsPerPage] = useState(16);
  useEffect(() => {
    const updateProductsPerPage = () => {
      setProductsPerPage(
        window.matchMedia("(max-width: 1024px)").matches ? 15 : 16,
      );
    };
    updateProductsPerPage();
    window.addEventListener("resize", updateProductsPerPage);
    return () => window.removeEventListener("resize", updateProductsPerPage);
  }, []);
  useEffect(() => {
    if (initialData.length > 0) return;
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch data");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result: ProductProps[] = await response.json();
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
    void fetchData();
  }, [initialData]);

  // Added scroll to top when the page changes
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
              {currentPage > 1 && (
                <Button
                  className={`${styles.button} ${styles.next}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
              )}
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={`page-${index + 1}`}
                  className={`${styles.button} ${currentPage === index + 1 ? styles.active : ""}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
              {currentPage < totalPages && (
                <Button
                  className={`${styles.button} ${styles.next}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopGrid;
