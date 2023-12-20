import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editedAdmin: null,
  error: null,
  loading: false,
};

const editAdminSlice = createSlice({
  name: "editAdmin",
  initialState,
  reducers: {
    editAdminStart: (state) => {
      state.loading = true;
    },
    editAdminSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = null;
    },
    editAdminFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { editAdminStart, editAdminSuccess, editAdminFailure } =
  editAdminSlice.actions;

export default editAdminSlice.reducer;
