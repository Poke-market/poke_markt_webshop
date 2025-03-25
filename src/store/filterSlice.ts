import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, PriceRange, categories } from "../types/apiTypes/item";
import { RootState } from "./index";

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
    {} as Record<Category, number>,
  ),
  priceRange: { min: 0, max: 1_000_000 },
  totalCount: 0,
};

const filterSlice = createSlice({
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
});

export const { setCategorieCounts, setTotalCount, setPriceRange } =
  filterSlice.actions;

export const selectCategorieCounts = (state: RootState) =>
  state.filter.categorieCounts;
export const selectTotalCount = (state: RootState) => state.filter.totalCount;
export const selectPriceRange = (state: RootState) => state.filter.priceRange;

export default filterSlice;
