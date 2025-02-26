import { Suspense, useState, useEffect } from "react";
import styles from "../scss/components/shopGrid.module.scss";
import { LoadingSkeleton, ProductCard, Pagination } from "../utils";
import { transformData } from "../utils/transformData";
import { ApiResponse } from "../types/types";
import { Props } from "./ProductCard";

export interface ShopGridProps {
  data?: Props[];
}
const ShopGrid = ({ data: initialData = [] }: ShopGridProps) => {
  const [data, setData] = useState<Props[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (initialData.length > 0) return;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://poke-market-backend-dev-rgj5.onrender.com/api/items?page=${currentPage}`,
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = (await response.json()) as ApiResponse;
        if (result.status !== "success") {
          throw new Error("API err");
        }
        const transformedData = transformData(result.data.items);
        setData(transformedData);
        setTotalPages(result.data.info.pages);
      } catch (err) {
        console.log(err instanceof Error ? err.message : "Error");
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, [currentPage, initialData]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);
  if (loading) return <LoadingSkeleton />;
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
