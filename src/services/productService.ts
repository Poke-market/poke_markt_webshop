import { Product, ApiListResponse, ApiSingleResponse } from "../types/types";

const API_BASE_URL = "https://poke-market-backend-dev-rgj5.onrender.com/api";

export const productService = {
  async getRecommendations(limit: number = 5): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/items?page=1&limit=${limit}`);
    if (!response.ok) throw new Error("Failed to fetch recommendations");
    const result = (await response.json()) as ApiListResponse;
    return result?.data?.items || [];
  },

  async searchProduct(name: string): Promise<Product | null> {
    let currentPage = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const response = await fetch(`${API_BASE_URL}/items?page=${currentPage}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const result = (await response.json()) as ApiListResponse;

      if (!result?.data?.items) {
        throw new Error("Invalid API response structure");
      }

      const matchingProduct = result.data.items.find((item: Product) => {
        if (!item?.name) return false;
        const normalizedItemName = normalizeText(item.name);
        const normalizedSearchTerm = normalizeText(name);
        return normalizedItemName === normalizedSearchTerm;
      });

      if (matchingProduct) {
        const productResponse = await fetch(
          `${API_BASE_URL}/items/${matchingProduct._id}`,
        );
        if (!productResponse.ok) throw new Error("Failed to fetch product");
        const productResult =
          (await productResponse.json()) as ApiSingleResponse;

        if (!productResult?.data?.item) {
          throw new Error("Invalid product data received");
        }

        if (productResult.status === "success") {
          return productResult.data.item;
        }
      }

      hasMorePages = currentPage < result.data.info.pages;
      currentPage++;
    }

    return null;
  },
};

const normalizeText = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};
