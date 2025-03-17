import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../types/apiTypes/item";
import { toggleArrayElement } from "../utils/helperFunctions";

const initialState = {
  categories: <Category[]>[],
  tags: <string[]>[],
  priceRange: {
    min: 100,
    max: 999999,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleCategory: (state, { payload: category }: PayloadAction<Category>) => {
      state.categories = toggleArrayElement(state.categories, category);
    },

    toggleTag: (state, { payload: tag }: PayloadAction<string>) => {
      state.tags = toggleArrayElement(state.tags, tag);
    },

    setMinPrice: (state, { payload: min }: PayloadAction<number>) => {
      state.priceRange.min = min;
    },

    setMaxPrice: (state, { payload: max }: PayloadAction<number>) => {
      state.priceRange.max = max;
    },

    resetFilters: () => {
      return initialState;
    },
  },
  selectors: {
    selectPriceRange: (state) => state.priceRange,
    selectCategories: (state) => state.categories,
    selectTags: (state) => state.tags,
  },
});

export const {
  toggleCategory,
  toggleTag,
  setMinPrice,
  setMaxPrice,
  resetFilters,
} = filterSlice.actions;
export const { selectPriceRange, selectCategories, selectTags } =
  filterSlice.selectors;

export default filterSlice;
