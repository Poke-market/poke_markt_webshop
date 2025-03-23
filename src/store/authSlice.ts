import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterResponse } from "../types/auth.ts";

interface AuthState {
  user: RegisterResponse["user"] | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ user: RegisterResponse["user"]; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice;
