import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login.js";
import { setErrorMessage } from "./notificationReducer.js";

const userSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      blogService.setToken(action.payload?.token ? action.payload.token : null);
      window.localStorage.setItem(
        "loggedBloglistappUser",
        JSON.stringify(action.payload),
      );
      return action.payload;
    },
  },
});

const { setUser } = userSlice.actions;

export const initializeLogin = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistappUser");
    const loggedUser = loggedUserJSON ? JSON.parse(loggedUserJSON) : null;
    dispatch(setUser(loggedUser));
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
    } catch {
      dispatch(setErrorMessage("wrong username or password"));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(setUser(null));
    window.localStorage.removeItem("loggedBloglistappUser");
    window.localStorage.clear();
  };
};

export default userSlice.reducer;
