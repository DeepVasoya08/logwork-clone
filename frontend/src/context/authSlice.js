import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: JSON.parse(localStorage.getItem("token")) || null,
    username: "",
  },
  reducers: {
    setToken: (state, actoin) => {
      state.token = actoin.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      window.location.reload();
    },
  },
});

export const { setToken, setUsername, removeToken } = authSlice.actions;

export default authSlice.reducer;
