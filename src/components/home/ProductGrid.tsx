import { useState, useRef } from "react";
import styles from "../../styles/components/home/ShopGrid.module.scss";
import { LoadingSkeleton, ProductCard, Pagination } from "../../utils";
import { transformData } from "../../utils/transformData.ts";
import { Props } from "./ProductCard.tsx";
import { useGetItemsQuery } from "../../store/pokemartApi";

export type ShopGridProps = {
  data?: Props[];
};

const ProductGrid = ({ data: initialData = [] }: ShopGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: apiData, isLoading } = useGetItemsQuery(currentPage, {
    skip: initialData.length > 0,
  });

  const displayData =
    initialData.length > 0
      ? initialData
      : apiData
        ? transformData(apiData.items)
        : [];
  const totalPages = apiData?.info.pages ?? 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Scroll to the top of the container where filters would be
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className={styles.shopContainer} ref={containerRef}>
      <div className={styles.flexContainer}>
        <div className={styles.backgroundBox} />
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.gridContainer}>
              {displayData.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
