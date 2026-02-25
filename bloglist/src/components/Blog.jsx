import { useState } from "react";
import { like, removeBlog } from "../reducers/blogReducer.js";
import { useDispatch, useSelector } from "react-redux";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const user = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = (blog) => {
    dispatch(like(blog));
  };

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      dispatch(removeBlog(blog));
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>

      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes ?? 0}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>{blog.user?.name}</div>
        {user.username === blog.user?.username && (
          <button onClick={() => handleDelete(blog)}>remove</button>
        )}
      </div>
    </div>
  );
};
export default Blog;
