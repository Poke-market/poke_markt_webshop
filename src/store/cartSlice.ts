import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../types/apiTypes/item";

export interface CartItem {
  item: Item;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: <CartItem[]>[],
};

function removeItemHelper(state: CartState, id: Item["_id"]) {
  state.items = state.items.filter((item) => item.item._id !== id);
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ item: Item; quantity?: number }>,
    ) => {
      const { item, quantity = 1 } = action.payload;
      if (!item) throw new Error("item is required");
      const existingItem = state.items.find(
        (cartItem) => cartItem.item._id === item._id,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ item, quantity });
      }
    },
    removeItem: (state, action: PayloadAction<Item["_id"]>) => {
      removeItemHelper(state, action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: Item["_id"]; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      if (!id) throw new Error("id is required");
      const item = state.items.find((item) => item.item._id === id);

      if (item) {
        item.quantity = quantity;
        if (item.quantity < 1) removeItemHelper(state, id);
      }
    },
    incrementQuantity: (state, action: PayloadAction<Item["_id"]>) => {
      const id = action.payload;
      if (!id) throw new Error("id is required");
      const item = state.items.find((item) => item.item._id === id);
      if (item) item.quantity++;
    },
    decrementQuantity: (state, action: PayloadAction<Item["_id"]>) => {
      const id = action.payload;
      if (!id) throw new Error("id is required");
      const item = state.items.find((item) => item.item._id === id);
      if (!item) return;
      item.quantity--;
      if (item.quantity < 1) removeItemHelper(state, id);
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
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  decrementQuantity,
  incrementQuantity,
} = cartSlice.actions;

export const { selectCartItemCount, selectCartItems } = cartSlice.selectors;

export const selectCartTotalPrice = createSelector(selectCartItems, (items) =>
  items.reduce(
    (total, item) => total + item.item.discount.discountedPrice * item.quantity,
    0,
  ),
);

export default cartSlice;
