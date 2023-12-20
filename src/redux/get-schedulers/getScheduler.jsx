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
      state.allAdmins = action.payload;
      state.loading = false;
      state.error = null;
    },
    getFilteredSchedulerFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    updateAdminList: (state, action) => {
      const updatedAdmin = action.payload;

      let findDocIndex = state.allAdmins.findIndex(
        (el) => el._id === updatedAdmin._id
      );

      state.allAdmins[findDocIndex] = updatedAdmin;
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
  updateAdminList,
} = getSchedulerSlice.actions;

export default getSchedulerSlice.reducer;
