import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { categories, Category } from "../types/apiTypes/item";

interface FilterState {
  categorieCounts: Record<Category, number>;
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
  },
  selectors: {
    selectCategorieCounts: (state) => state.categorieCounts,
    selectTotalCount: (state) => state.totalCount,
  },
});

export const { setCategorieCounts, setTotalCount } = filterSlice.actions;
export const { selectCategorieCounts, selectTotalCount } =
  filterSlice.selectors;

export default filterSlice;
