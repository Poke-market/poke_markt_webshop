import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterResponse } from "../types/auth";

interface AuthState {
  user: RegisterResponse["user"] | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Defining the initial state using that type
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: Boolean(localStorage.getItem("token")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Setting the user and token in the state and local storage
    setAuth: (
      state,
      action: PayloadAction<{ user: RegisterResponse["user"]; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    // Clearing the user and token from the state and local storage
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
