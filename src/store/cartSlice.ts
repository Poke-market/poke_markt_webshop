import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  quantity: number;
}

const initialState = {
  items: <CartItem[]>[],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ id: string; quantity?: number }>,
    ) => {
      const { id, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ id, quantity });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity = Math.max(1, quantity); // Ensure quantity is at least 1
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  selectors: {
    selectCartItems: (state) => state.items,
    selectCartItemCount: (state) =>
      state.items.reduce(
        (total: number, item: CartItem) => total + item.quantity,
        0,
      ),
    selectCartItemById: (state, id: string) =>
      state.items.find((item: CartItem) => item.id === id) ?? null,
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export const { selectCartItems, selectCartItemCount, selectCartItemById } =
  cartSlice.selectors;

export default cartSlice;
