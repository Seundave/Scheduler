import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import schedulerReducer from "./admin-scheduler/scheduleSlice";
import adminReducer from "./create-admin/createAdmin";

export const store = configureStore({
  reducer: {
    user: userReducer,
    scheduler: schedulerReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
