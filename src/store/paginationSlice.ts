import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import pokemartApi from "./pokemartApi";

interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 16,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = Math.max(1, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      pokemartApi.endpoints.getItems.matchFulfilled,
      (state, { payload }) => {
        state.totalPages = payload.info.count;
        state.currentPage = 1;
      },
    );
  },
  selectors: {
    selectCurrentPage: (state) => state.currentPage,
    selectTotalPages: (state) => state.totalPages,
    selectItemsPerPage: (state) => state.itemsPerPage,
  },
});

export const { setItemsPerPage } = paginationSlice.actions;

export const { selectCurrentPage, selectTotalPages, selectItemsPerPage } =
  paginationSlice.selectors;

export default paginationSlice;
