import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userScheduleListing: [],
  error: null,
  isLoading: false,
};

const getUserLisitngSlice = createSlice({
  name: "userschedules",
  initialState,
  reducers: {
    getUserListingStart: (state) => {
      state.isLoading = true;
    },
    getUserListingSuccess: (state, action) => {
      state.userScheduleListing = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getUserListingFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    getFilteredListingStart: (state) => {
      state.isLoading = true;
    },
    getFilteredListingSuccess: (state, action) => {
      state.allAdmins = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getFilteredListingFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    updateUserList: (state, action) => {
      const updatedUserListing = action.payload;

      let findDocIndex = state.userScheduleListing.findIndex(
        (el) => el._id === updatedUserListing._id
      );

      state.userScheduleListing[findDocIndex] = updatedUserListing;
    },
  },
});

export const {
  getUserListingStart,
  getUserListingSuccess,
  getUserListingFailure,
  getFilteredListingStart,
  getFilteredListingSuccess,
  getFilteredListingFailure,
  updatedUserListing,
} = getUserLisitngSlice.actions;

export default getUserLisitngSlice.reducer;
