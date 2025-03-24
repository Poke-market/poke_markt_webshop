import { useEffect } from "react";
import {
  useParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { useAppDispatch } from "../store";
import { useGetItemsQuery } from "../store/pokemartApi";
import { setCategorieCounts, setTotalCount } from "../store/filterSlice";
import { SearchParamGetter } from "../utils";

const useProductGrid = () => {
  const { page = 1 } = useParams();
  const navigate = useNavigate();
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
      .get("minPrice")
      .get("maxPrice")
      .getFoundParams(),
  });

  const info = data?.info;
  const items = data?.items;

  useEffect(() => {
    if (info) {
      dispatch(setCategorieCounts(info.categorieCount));
      dispatch(setTotalCount(info.count));
    }
  }, [info, dispatch]);

  const handlePageChange = (page: number) => {
    void navigate(`/shop/${page}${search}`);
  };

  return {
    page: +page,
    items,
    isLoading,
    info,
    handlePageChange,
  };
};

export default useProductGrid;
