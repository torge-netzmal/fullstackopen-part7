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
      <h1 className="text-4xl font-bold mb-2 underline text-gray-700">
        blogging app
      </h1>
      <Togglable
        buttonLabelShow="create new blog"
        buttonLabelHide="cancel"
        ref={blogFormRef}
      >
        <div
          className={
            "border-1 border-gray-300  bg-gray-200  p-2 m-2 rounded-lg shadow"
          }
        >
          <h2
            className={
              "flex flex-wrap text-2xl font-bold mb-2 text-gray-700 gap-2 "
            }
          >
            create new
          </h2>
          <BlogForm toggleComponent={blogFormRef} />
        </div>
      </Togglable>
      <div>
        {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      </div>
    </div>
  );
};

export default BlogList;
