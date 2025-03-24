import { Suspense, useEffect, useRef } from "react";
import styles from "../../styles/components/Shop/ShopGrid.module.scss";
import {
  LoadingSkeleton,
  ProductCard,
  Pagination,
  SearchParamGetter,
  Heading,
} from "../../utils";
import { useGetItemsQuery } from "../../store/pokemartApi";
import {
  useParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { useAppDispatch } from "../../store";
import {
  setCategorieCounts,
  setPriceRange,
  setTotalCount,
} from "../../store/filterSlice";

const ProductGrid = () => {
  const { page = 1 } = useParams();
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const { search } = useLocation();
  const dispatch = useAppDispatch();

  const searchParamsGetter = new SearchParamGetter(searchParams);

  const { data, isLoading } = useGetItemsQuery({
    page: +page,
    ...searchParamsGetter
      .get("sort")
      .get("order")
      .get("limit")
      .getAll("cat")
      .getAll("tag")
      .get("minPrice", { as: "minDiscountedPrice" })
      .get("maxPrice", { as: "maxDiscountedPrice" })
      .getFoundParams(),
  });
  const info = data?.info;
  const items = data?.items;

  useEffect(() => {
    const isInView = (gridRef.current?.getBoundingClientRect().top ?? -1) >= 0;
    if (gridRef.current && !isInView) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  useEffect(() => {
    if (info) {
      dispatch(setCategorieCounts(info.categorieCount));
      dispatch(setTotalCount(info.count));
      dispatch(setPriceRange(info.priceRange));
    }
  }, [info, dispatch]);

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
              currentPage={+page}
              totalPages={info?.pages ?? 0}
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
