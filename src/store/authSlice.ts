import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/global";

interface AuthState {
  user: User | null;
  isAuthChecked: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.isAuthChecked = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { loginSuccess, setUser, setAuthChecked, logout } = authSlice.actions;
export default authSlice.reducer;
