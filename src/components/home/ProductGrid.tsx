import { useEffect, useRef, useState } from "react";
import styles from "../../styles/components/home/ShopGrid.module.scss";
import { LoadingSkeleton } from "../../utils";
import ProductCard from "./ProductCard";
import { useGetItemsQuery } from "../../store/pokemartApi";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Pagination } from "../common";

const ProductGrid = () => {
  const { page = 1 } = useParams();
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);
  const { search } = useLocation();
  const [pageChanged, setPageChanged] = useState(false);

  const { data, isLoading } = useGetItemsQuery({
    page: Number(page),
  });

  useEffect(() => {
    if (pageChanged && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
      setPageChanged(false); // Reset the state after scrolling
    }
  }, [pageChanged]);

  if (isLoading || !data) return <LoadingSkeleton />;

  return (
    <div className={styles.shopContainer} ref={gridRef}>
      <div className={styles.flexContainer}>
        <div className={styles.backgroundBox} />
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.gridContainer}>
              {data.items.map((item) => (
                <ProductCard key={item._id} item={item} className="" />
              ))}
            </div>
            <Pagination
              currentPage={Number(page)}
              totalPages={data.info.pages}
              onPageChange={(newPage) => {
                setPageChanged(true); // Set the state when page changes
                void navigate(`/shop/${newPage}${search}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
