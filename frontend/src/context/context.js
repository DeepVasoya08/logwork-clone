import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import workReducer from "./workSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    work: workReducer,
  },
});
