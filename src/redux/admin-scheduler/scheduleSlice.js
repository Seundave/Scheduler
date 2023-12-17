import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentScheduler: null,
  error: null,
  loading: false,
};

const schedulerSlice = createSlice({
  name: "scheduler",
  initialState,
  reducers: {
    schedulerStart: (state) => {
      state.loading = true;
    },
    schedulerSuccess: (state, action) => {
      state.currentScheduler = action.payload;
      state.loading = false;
      state.error = null;
    },
    schedulerFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { schedulerStart, schedulerSuccess, schedulerFailure } =
  schedulerSlice.actions;

export default schedulerSlice.reducer;
