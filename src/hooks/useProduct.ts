import { useState, useEffect } from "react";
import { Product } from "../types/types";
import { productService } from "../services/productService";

export const useProduct = (name: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const searchName = name?.replace(/-/g, " ");
        
        // Fetch recommendations first
        const recommendations = await productService.getRecommendations();
        setAvailableProducts(recommendations);

        if (searchName) {
          // Then search for the specific product
          const foundProduct = await productService.searchProduct(searchName);
          setProduct(foundProduct);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    void fetchProduct();
  }, [name]);

  return { product, loading, availableProducts };
}; 