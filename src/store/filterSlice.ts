import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, PriceRange, categories } from "../types/apiTypes/item";

interface FilterState {
  categorieCounts: Record<Category, number>;
  priceRange: PriceRange;
  totalCount: number;
}

const initialState: FilterState = {
  categorieCounts: categories.reduce(
    (acc, category) => {
      acc[category] = 0;
      return acc;
    },
    priceRange: { min: 0, max: 1_000_000 } as PriceRange,
    {} as Record<Category, number>,
  ),
  totalCount: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategorieCounts: (
      state,
      action: PayloadAction<Record<Category, number>>,
    ) => {
      if (!action.payload) return;
      if (Object.keys(action.payload).length === 0) return;
      state.categorieCounts = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload || 0;
    },
    setPriceRange: (state, action: PayloadAction<PriceRange>) => {
      if (!action.payload) return;

      const { min, max } = action.payload;
      const { min: currentMin, max: currentMax } = state.priceRange;

      if (min === undefined || max === undefined) return;
      if (min === currentMin && max === currentMax) return;

      state.priceRange = { min, max };
    },
  },
  selectors: {
    selectCategorieCounts: (state) => state.categorieCounts,
    selectTotalCount: (state) => state.totalCount,
    selectPriceRange: (state) => state.priceRange,
  },
});

export const { setCategorieCounts, setTotalCount, setPriceRange } =
  filterSlice.actions;
export const { selectCategorieCounts, selectTotalCount, selectPriceRange } =
  filterSlice.selectors;

export default filterSlice;
