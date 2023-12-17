import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  error: null,
  loading: false,
};

const createAdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    createAdminStart: (state) => {
      state.loading = true;
    },
    createAdminSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = null;
    },
    createAdminFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { createAdminStart, createAdminSuccess, createAdminFailure } =
  createAdminSlice.actions;

export default createAdminSlice.reducer;
