import {
  combineReducers,
  configureStore,
  DevToolsEnhancerOptions,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import cartReducer, { cartSlice } from "./cartSlice";
import pokemartApi from "./pokemartApi";
import filterReducer from "./filterSlice";
import authReducer from "./authSlice";
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
  actionCreators: {
    ...cartSlice.actions,
    ...authSlice.actions,
    ...filterSlice.actions,
  },
};

const rootReducer = combineReducers({
  cart: cartReducer,
  [pokemartApi.reducerPath]: pokemartApi.reducer,
  [filterSlice.reducerPath]: filterSlice.reducer,
  [authSlice.reducerPath]: authSlice.reducer,
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

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
