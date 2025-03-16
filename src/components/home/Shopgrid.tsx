import { Suspense, useState, useEffect, useRef } from "react";
import styles from "../../scss/components/home/ShopGrid.module.scss";
import { LoadingSkeleton, ProductCard, Pagination } from "../../utils";
import { transformData } from "../../utils/transformData.ts";
import { ApiResponse } from "../../types/types.ts";
import { Props } from "./ProductCard.tsx";

export interface ShopGridProps {
  data?: Props[];
}
const ShopGrid = ({ data: initialData = [] }: ShopGridProps) => {
  const [data, setData] = useState<Props[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialData.length > 0) return;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/items?page=${currentPage}`,
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
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  if (loading) return <LoadingSkeleton />;
  return (
    <div className={styles.shopContainer} ref={gridRef}>
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
