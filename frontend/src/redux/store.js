import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice, // <-- Add user key here
  },
});
