import { Suspense } from "react";
import styles from "../../styles/components/home/ShopGrid.module.scss";
import { LoadingSkeleton, ProductCard, Pagination, Heading } from "../../utils";
import { useProductGrid, useScrollToGrid } from "../../hooks";

const ProductGrid = () => {
  const { page, items, isLoading, info, handlePageChange } = useProductGrid();
  const gridRef = useScrollToGrid(page);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className={styles.shopContainer} ref={gridRef}>
      <div className={styles.flexContainer}>
        <div className={styles.backgroundBox} />
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            {items?.length ? (
              <div className={styles.gridContainer}>
                <Suspense fallback={<LoadingSkeleton />}>
                  {items.map((item) => (
                    <ProductCard key={item._id} item={item} className="" />
                  ))}
                </Suspense>
              </div>
            ) : (
              <div className={styles.noItems}>
                <Heading size="textxl">No items found</Heading>
              </div>
            )}
            <Pagination
              currentPage={page}
              totalPages={info?.pages ?? 0}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
