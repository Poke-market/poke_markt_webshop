import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { categories, Category } from "../types/apiTypes/item";
import { toggleArrayElement } from "../utils/helperFunctions";

type PriceRange = {
  min: number;
  max: number;
};

type FilterState = {
  categories: Category[];
  tags: string[];
  priceRange: PriceRange;
};

const initialState: FilterState = {
  categories: [],
  tags: [],
  priceRange: {
    min: 100,
    max: 999999,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleFilterCategory: (
      state,
      { payload: category }: PayloadAction<string>,
    ) => {
      if (!categories.includes(category)) return;
      state.categories = toggleArrayElement(state.categories, category);
    },

    toggleFilterTag: (state, { payload: tag }: PayloadAction<string>) => {
      state.tags = toggleArrayElement(state.tags, tag);
    },

    setFilterMinPrice: (state, { payload: min }: PayloadAction<number>) => {
      state.priceRange.min = min;
    },

    setFilterMaxPrice: (state, { payload: max }: PayloadAction<number>) => {
      state.priceRange.max = max;
    },

    setFilterPriceRange: (
      state,
      { payload: range }: PayloadAction<PriceRange>,
    ) => {
      state.priceRange = range;
    },

    resetFilters: () => {
      return initialState;
    },
  },
  selectors: {
    selectFilterPriceRange: (state) => state.priceRange,
    selectFilterCategories: (state) => state.categories,
    selectFilterTags: (state) => state.tags,
  },
});

export const {
  toggleFilterCategory,
  toggleFilterTag,
  setFilterMinPrice,
  setFilterMaxPrice,
  setFilterPriceRange,
  resetFilters,
} = filterSlice.actions;
export const {
  selectFilterPriceRange,
  selectFilterCategories,
  selectFilterTags,
} = filterSlice.selectors;

export default filterSlice;
