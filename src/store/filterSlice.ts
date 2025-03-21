import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../types/apiTypes/item";

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
  selectors: {
    selectCategorieCounts: (state) => state.categorieCounts,
    selectTotalCount: (state) => state.totalCount,
  },
});

export const { setCategorieCounts, setTotalCount } = filterSlice.actions;
export const { selectCategorieCounts, selectTotalCount } =
  filterSlice.selectors;

export default filterSlice;
