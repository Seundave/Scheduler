import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAdmins: [],
  error: null,
  loading: false,
};

const getAdminSlice = createSlice({
  name: "getAdmin",
  initialState,
  reducers: {
    getAdminStart: (state) => {
      state.loading = true;
    },
    getAdminSuccess: (state, action) => {
      state.allAdmins = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAdminFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getFilteredAdminStart: (state) => {
      state.loading = true;
    },
    getFilteredAdminSuccess: (state, action) => {
      state.allAdmins = action.payload;
      state.loading = false;
      state.error = null;
    },
    getFilteredAdminFailure: (state, action) => {
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
  getAdminStart,
  getAdminSuccess,
  getAdminFailure,
  getFilteredAdminStart,
  getFilteredAdminSuccess,
  getFilteredAdminFailure,
  updateAdminList,
} = getAdminSlice.actions;

export default getAdminSlice.reducer;
