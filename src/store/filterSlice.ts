import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../types/apiTypes/item";
import type { RootState } from "./index";

interface FilterState {
  categorieCounts: Record<Category, number>;
  totalCount: number;
}

const initialState: FilterState = {
  categorieCounts: {} as Record<Category, number>,
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
      state.categorieCounts = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
  },
});

export const { setCategorieCounts, setTotalCount } = filterSlice.actions;

// Create selectors
export const selectCategorieCounts = (state: RootState) =>
  state.filter.categorieCounts;
export const selectTotalCount = (state: RootState) => state.filter.totalCount;

export default filterSlice;
