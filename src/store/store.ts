import { configureStore } from "@reduxjs/toolkit";
import pokemartApi from "./pokemartApi";

export const store = configureStore({
  reducer: {
    [pokemartApi.reducerPath]: pokemartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemartApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
