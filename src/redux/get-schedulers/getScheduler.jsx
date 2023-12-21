import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allSchedulers: [],
  error: null,
  loading: false,
};

const getSchedulerSlice = createSlice({
  name: "getSchedulers",
  initialState,
  reducers: {
    getSchedulerStart: (state) => {
      state.loading = true;
    },
    getSchedulerSuccess: (state, action) => {
      state.allAdmins = action.payload;
      state.loading = false;
      state.error = null;
    },
    getSchedulerFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getFilteredSchedulerStart: (state) => {
      state.loading = true;
    },
    getFilteredSchedulerSuccess: (state, action) => {
      state.allSchedulers = action.payload;
      state.loading = false;
      state.error = null;
    },
    getFilteredSchedulerFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    updateSchedulerList: (state, action) => {
      const updatedScheduler = action.payload;

      let findDocIndex = state.allSchedulers.findIndex(
        (el) => el._id === updatedScheduler._id
      );

      state.allSchedulers[findDocIndex] = updatedScheduler;
    },
  },
});

export const {
  getSchedulerStart,
  getSchedulerSuccess,
  getSchedulerFailure,
  getFilteredSchedulerStart,
  getFilteredSchedulerSuccess,
  getFilteredSchedulerFailure,
  updateSchedulerList,
} = getSchedulerSlice.actions;

export default getSchedulerSlice.reducer;
