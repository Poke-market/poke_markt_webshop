import { Suspense, useState, useEffect } from "react";
import styles from "../scss/components/shopGrid.module.scss";
import ProductCard from "./ProductCard";
import { ProductProps } from "../types/types.ts";
import Button from "./Button";

interface ShopGrid {
  data?: ProductProps[];
}

const ShopGrid = ({ data: initialData = [] }: ShopGrid) => {
  const [data, setData] = useState<ProductProps[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  useEffect(() => {
    if (initialData.length > 0) return;

    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result: ProductProps[] = await response.json();

        // here i'm transforming the data to match the ProductProps type
        const transformedData = result.map((product) => ({
          id: product.id,
          name: product.title,
          title: product.title,
          description: product.description,
          image: product.image,
          currentPrice: `€${product.price}`,
          originalPrice: `€${product.price + 10}`,
          discountText: "-10%",
          price: product.price,
        }));

        setData(transformedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [initialData]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(data.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.errorMessage}>Error: {error}</div>;

  return (
    <div className={styles.shopContainer}>
      <div className={styles.flexContainer}>
        <div className={styles.backgroundBox} />
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.gridContainer}>
              <Suspense fallback={<div>Loading feed...</div>}>
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    className="w-full"
                  />
                ))}
              </Suspense>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                color="deep_orange_50"
                size="3x1"
                variant="fill"
                className={styles.button}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={`page-${index + 1}`}
                  color={
                    currentPage === index + 1 ? "lime_800" : "deep_orange_50"
                  }
                  size="3x1"
                  variant="fill"
                  className={styles.button}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                color="deep_orange_50"
                size="3x1"
                variant="fill"
                className={styles.button}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopGrid;
