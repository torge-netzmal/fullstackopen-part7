import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setErrorMessage, setSuccessMessage } from "./notificationReducer.js";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    concatBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const id = action.payload.id;

      return state.map((blog) => (blog.id !== id ? blog : action.payload));
    },
    removeFromBlogs(state, action) {
      const id = action.payload.id;

      return state.filter((blog) => blog.id !== id);
    },
  },
});

const { removeFromBlogs, setBlogs, concatBlog, updateBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create(content);
      dispatch(concatBlog(blog));
      dispatch(
        setSuccessMessage(`a new blog '${blog.title}' by ${blog.author} added`),
      );
    } catch (error) {
      dispatch(setErrorMessage(`Error while creating: '${error}'`));
    }
  };
};

export const removeBlog = (content) => {
  return async (dispatch) => {
    try {
      await blogService.remove(content.id);
      dispatch(removeFromBlogs(content));
    } catch (error) {
      dispatch(
        setErrorMessage(
          `Unable to delete blog '${content.title}' by ${content.author}. Error: ${error}`,
        ),
      );
    }
  };
};

export const like = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.update(blog.id, {
      ...blog,
      likes: (blog.likes ?? 0) + 1,
    });
    dispatch(updateBlog(newBlog));
  };
};

export default blogSlice.reducer;
