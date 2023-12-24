import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editedList: null,
  error: null,
  loading: false,
};

const editListSlice = createSlice({
  name: "editList",
  initialState,
  reducers: {
    editListStart: (state) => {
      state.loading = true;
    },
    editListSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = null;
    },
    editListFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { editListStart, editListSuccess, editListFailure } =
  editListSlice.actions;

export default editListSlice.reducer;