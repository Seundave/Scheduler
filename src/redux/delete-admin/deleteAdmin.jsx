import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
};

const deleteAdminSlice = createSlice({
  name: "deleteAdmin",
  initialState,
  reducers: {
    deleteAdminStart: (state) => {
      state.loading = true;
    },
    deleteAdminSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    deleteAdminFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { deleteAdminStart, deleteAdminSuccess, deleteAdminFailure } =
  deleteAdminSlice.actions;

export default deleteAdminSlice.reducer;
