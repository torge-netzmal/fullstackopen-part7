import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    updateUser(state, action) {
      const id = action.payload.id;

      return state.map((user) => (user.id !== id ? user : action.payload));
    },
  },
});

const { setUsers } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export default userSlice.reducer;
