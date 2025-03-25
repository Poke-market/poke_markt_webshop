import { useEffect, useRef } from "react";

const useScrollToGrid = (page: number) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isInView = (gridRef.current?.getBoundingClientRect().top ?? -1) >= 0;
    if (gridRef.current && !isInView) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  return gridRef;
};

export default useScrollToGrid;
