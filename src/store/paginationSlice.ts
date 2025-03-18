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

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    firstPage: (state) => {
      state.currentPage = 1;
    },
    previousPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    nextPage: (state) => {
      if (state.currentPage < state.totalPages) {
        state.currentPage += 1;
      }
    },
    lastPage: (state) => {
      state.currentPage = state.totalPages;
    },
    setPage: (state, action: PayloadAction<number>) => {
      const page = action.payload;
      if (page >= 1 && page <= state.totalPages) {
        state.currentPage = page;
      }
    },
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
});

export const {
  firstPage,
  previousPage,
  nextPage,
  lastPage,
  setPage,
  setItemsPerPage,
} = paginationSlice.actions;

export default paginationSlice;
