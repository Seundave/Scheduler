import { combineReducers, configureStore } from "@reduxjs/toolkit";
import schedulerUserReducer from "./schedulerUsers/userSlice";
import getSchedulers from "./getSchedulers/getSchedulers";
import bookScheduler from "./userSchedule/userScheduleSlice";
import getUserListings from "./getUserListing/getUserListing";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: schedulerUserReducer,
  getSchedulers: getSchedulers,
  schedule: bookScheduler,
  userschedules: getUserListings,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
