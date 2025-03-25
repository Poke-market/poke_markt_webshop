import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/apiTypes/auth";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
}

// Defining the initial state using that type
const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Setting the user and token in the state and local storage
    setAuth: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      const token = Cookies.get("token");
      console.log(token);
    },
    // Clearing the user and token from the state and local storage
    clearAuth: (state) => {
      state.user = null;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => Boolean(state.user),
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export const { selectUser, selectIsAuthenticated } = authSlice.selectors;
export default authSlice;
