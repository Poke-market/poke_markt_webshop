import { Suspense, useEffect, useRef } from "react";
import styles from "../../styles/components/home/ShopGrid.module.scss";
import { LoadingSkeleton, ProductCard, Pagination } from "../../utils";
import { useGetItemsQuery } from "../../store/pokemartApi";
import {
  useParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { Category } from "../../types/apiTypes/item";

const ProductGrid = () => {
  const { page = 1 } = useParams();
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  const { data, isLoading } = useGetItemsQuery({
    page: +page,
    limit: 16,
    cat: searchParams.getAll("cat") as Category[],
    tag: searchParams.getAll("tag"),
    minPrice: Number(searchParams.get("minPrice")),
    maxPrice: Number(searchParams.get("maxPrice")),
  });

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  if (isLoading || !data) return <LoadingSkeleton />;
  const { items, info } = data;
  return (
    <div className={styles.shopContainer} ref={gridRef}>
      <div className={styles.flexContainer}>
        <div className={styles.backgroundBox} />
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.gridContainer}>
              <Suspense fallback={<LoadingSkeleton />}>
                {items?.map((item) => (
                  <ProductCard key={item._id} item={item} className="" />
                ))}
              </Suspense>
            </div>
            <Pagination
              currentPage={+page}
              totalPages={info.pages}
              onPageChange={(page) => {
                void navigate(`/shop/${page}${search}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductGrid;
