import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isAuthenticated: false,
  setlogout: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    logout: (state, action) => {
      state.setlogout = action.payload;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;

export default authSlice.reducer;
