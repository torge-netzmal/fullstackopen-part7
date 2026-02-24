import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { error: null, success: null },
  reducers: {
    setNotificationText: (state, action) => {
      if (action.payload.type === "error") {
        return { ...state, error: action.payload.text };
      } else if (action.payload.type === "success") {
        return { ...state, success: action.payload.text };
      }
      return state;
    },
    removeNotificationText: (state, action) => {
      if (action.payload === "error") {
        return { ...state, error: null };
      } else if (action.payload === "success") {
        return { ...state, success: null };
      }
      return { error: null, success: null };
    },
  },
});

const { setNotificationText, removeNotificationText } =
  notificationSlice.actions;

export const setNotification = (text, type, seconds = 5) => {
  return async (dispatch) => {
    dispatch(setNotificationText({ text, type }));
    setTimeout(() => dispatch(removeNotificationText(type)), seconds * 1000);
  };
};

export const setErrorMessage = (text, seconds = 5) => {
  return async (dispatch) => {
    dispatch(setNotification(text, "error", seconds));
  };
};

export const setSuccessMessage = (text, seconds = 5) => {
  return async (dispatch) => {
    dispatch(setNotification(text, "success", seconds));
  };
};

export default notificationSlice.reducer;
