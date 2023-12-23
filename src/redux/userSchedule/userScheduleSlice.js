import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSchedule: null,
  error: null,
  isLoading: false,
};

const userScheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    scheduleStart: (state) => {
      state.isLoading = true;
    },
    scheduleSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    scheduleFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { scheduleStart, scheduleSuccess, scheduleFailure } =
  userScheduleSlice.actions;

export default userScheduleSlice.reducer;
