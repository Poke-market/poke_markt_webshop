import { useEffect, Suspense } from "react";
import { ProductProps } from "../types/types.ts";
import ProductCard from "./ProductCard";

type ShopColumnOneProps = {
  data?: ProductProps[];
};

const ShopColumnOne = ({ data: initialData = [] }: ShopColumnOneProps) => {
  // Fetching data from my API
  useEffect(() => {
    if (initialData.length > 0) return;

    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/pokemon-cards");
        if (!response.ok) throw new Error("Failed to fetch data");
        await response.json();
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [initialData]);

  const currentProducts = initialData;

  return (
    <div className="shop-grid">
      <div className="shop-column">
        <Suspense fallback={<div>Loading feed...</div>}>
          {currentProducts.map((product) => (
            <ProductCard key={product.id} {...product} className="w-full" />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default ShopColumnOne;
