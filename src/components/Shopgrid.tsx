import { Suspense, useState, useEffect } from "react";
import styles from "../scss/components/shopGrid.module.scss";
import { Button, LoadingSkeleton, ProductCard, Pagination } from "../utils";
import { transformData } from "../utils/transformData";
import { ApiResponse } from "../types/types";
import { Props } from "./ProductCard";

export interface ShopGridProps {
  data?: Props[];
}
const ShopGrid = ({ data: initialData = [] }: ShopGridProps) => {
  const [data, setData] = useState<Props[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
        const response = await fetch(
          `https://poke-market-backend-dev-rgj5.onrender.com/api/items?page=${currentPage}&limit=${productsPerPage}`,
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = (await response.json()) as ApiResponse;
        if (result.status !== "success") {
          throw new Error("API returned an error");
        }
        const transformedData = transformData(result.data.items);
        setData(transformedData);
        setTotalPages(result.data.info.pages);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, [currentPage, initialData, productsPerPage]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);
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
                {data.map((product) => (
                  <ProductCard key={product.id} {...product} className="" />
                ))}
              </Suspense>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopGrid;
