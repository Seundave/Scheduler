import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import schedulerReducer from "./admin-scheduler/scheduleSlice";
import adminReducer from "./create-admin/createAdmin";
import editAdminReducer from "./edit-admin/editAdmin";
import deleteAdminReducer from "./delete-admin/deleteAdmin";
import getAdminReducer from "./get-admins/getAdmins";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  scheduler: schedulerReducer,
  admin: adminReducer,
  editAdmin: editAdminReducer,
  deleteAdmin:deleteAdminReducer,
  getAdmin:getAdminReducer
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
