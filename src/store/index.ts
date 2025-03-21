import {
  combineReducers,
  configureStore,
  DevToolsEnhancerOptions,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "./cartSlice";
import pokemartApi from "./pokemartApi";
import filterSlice from "./filterSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const devToolsOptions: DevToolsEnhancerOptions = {
  // add action creators here so they are available in the Redux DevTools
  actionCreators: {
    ...cartSlice.actions,
  },
};

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  [pokemartApi.reducerPath]: pokemartApi.reducer,
  filter: filterSlice.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [pokemartApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.DEV && devToolsOptions,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(pokemartApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
