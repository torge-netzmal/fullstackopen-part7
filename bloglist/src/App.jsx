import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { useDispatch, useSelector } from "react-redux";

import { initializeBlogs } from "./reducers/blogReducer.js";
import { initializeUser, logoutUser } from "./reducers/loginReducer.js";

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => {
    return state.blogs
      .map((blog) => blog)
      .sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
  });

  const user = useSelector((state) => state.login);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  const handleLogout = async (event) => {
    event.preventDefault();

    dispatch(logoutUser());
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification notificationType="error" />
      <Notification notificationType="success" />
      {!user && <LoginForm />}
      {user && (
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
      )}

      {user && (
        <Togglable
          buttonLabelShow="create new blog"
          buttonLabelHide="cancel"
          ref={blogFormRef}
        >
          <h2>create new</h2>
          <BlogForm toggleComponent={blogFormRef} />
        </Togglable>
      )}
      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
