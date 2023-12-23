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
  },
});

export const { getUserListingStart, getUserListingSuccess, getUserListingFailure } =
getUserLisitngSlice.actions;

export default getUserLisitngSlice.reducer;
