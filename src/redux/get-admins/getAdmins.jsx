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

    updateCreateAdminList: (state, action) => {
      const newAdmin = action.payload;
      state.allAdmins = [...state.allAdmins, newAdmin];
      state.loading = false;
    },

    deleteAdminList: (state, action) => {
      const adminIdToDelete = action.payload;
      state.allAdmins = state.allAdmins.filter(
        (admin) => admin.stockId !== adminIdToDelete
      );
      state.loading = false;
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
  updateCreateAdminList,
  deleteAdminList,
} = getAdminSlice.actions;

export default getAdminSlice.reducer;
