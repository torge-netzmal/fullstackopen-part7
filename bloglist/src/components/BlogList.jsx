import Togglable from "./Togglable.jsx";
import BlogForm from "./BlogForm.jsx";
import { useSelector } from "react-redux";
import { useRef } from "react";
import Blog from "./Blog.jsx";

const BlogList = () => {
  const user = useSelector((state) => state.login);
  const blogFormRef = useRef();
  const blogs = useSelector((state) => {
    return state.blogs
      .map((blog) => blog)
      .sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
  });
  return (
    <div>
      <h1>blog app</h1>
      <Togglable
        buttonLabelShow="create new blog"
        buttonLabelHide="cancel"
        ref={blogFormRef}
      >
        <h2>create new</h2>
        <BlogForm toggleComponent={blogFormRef} />
      </Togglable>
      <div>
        {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      </div>
    </div>
  );
};

export default BlogList;
