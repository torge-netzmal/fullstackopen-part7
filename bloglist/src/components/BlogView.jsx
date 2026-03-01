import { commentOnBlog, like, removeBlog } from "../reducers/blogReducer.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import { useField } from "../hooks/index.js";

const BlogView = () => {
  const user = useSelector((state) => state.login);

  const comment = useField("text");

  const match = useMatch("/blogs/:id");
  const blog = useSelector((state) =>
    match ? state.blogs.find((blog) => blog.id === match.params.id) : null,
  );

  const dispatch = useDispatch();

  const handleLike = (blog) => {
    dispatch(like(blog));
  };

  const addComment = (event) => {
    event.preventDefault();
    dispatch(commentOnBlog(blog.id, comment.value));
    comment.reset();
  };

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      dispatch(removeBlog(blog));
    }
  };

  return blog ? (
    <div>
      <h1
        className={
          "flex flex-wrap text-4xl font-bold mb-2 text-gray-700 gap-2 "
        }
      >
        {blog.title}
        <span className={"gap-2 text-gray-500 "}>{blog.author}</span>
      </h1>
      <div
        className={
          "flex flex-col border-1 border-gray-300  bg-gray-200  p-2 m-2 rounded-lg shadow"
        }
      >
        <div className={"m-3 font-semibold text-gray-400"}>
          <a href={blog.url} target="_blank">
            {blog.url}
          </a>
        </div>
        <div className={"flex flex-col justify-between"}>
          <div className={"flex m-3 flex-row flex-wrap gap-2 items-center"}>
            <span> likes {blog.likes ?? 0}</span>
            <button
              className={
                "rounded-lg px-2.5 py-1.5 bg-green-400 font-semibold text-white shadow hover:bg-green-500"
              }
              onClick={() => handleLike(blog)}
            >
              like
            </button>
          </div>
          {blog.user && (
            <div className={"m-3 font-semibold text-gray-500"}>
              added by{" "}
              <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
            </div>
          )}
        </div>
        {user.username === blog.user?.username && (
          <div className={"m-3"}>
            <button
              className={
                "rounded-lg px-2.5 py-1.5 bg-red-400 font-semibold text-white shadow hover:bg-red-500"
              }
              onClick={() => handleDelete(blog)}
            >
              remove
            </button>
          </div>
        )}
      </div>
      <div
        className={
          "flex flex-col border-1 border-gray-300  bg-gray-200  p-2 m-2 rounded-lg shadow"
        }
      >
        <h2
          className={
            "flex flex-wrap text-2xl font-bold mb-2 text-gray-700 gap-2 "
          }
        >
          comments
        </h2>
        <form onSubmit={addComment}>
          <input
            className={
              "rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
            }
            {...comment.props}
            placeholder="write new comment here"
          />
          <button
            className={
              "rounded-lg m-3 px-2.5 py-1.5 bg-blue-400 font-semibold text-white shadow hover:bg-blue-500"
            }
            type="submit"
          >
            add comment
          </button>
        </form>
        <div>
          <ul className={"space-y-2"}>
            {blog.comments.map((comment, index) => (
              <li
                className={
                  "rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                }
                key={comment + String(index)}
              >
                {comment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <p>Blog not found</p>
  );
};

export default BlogView;
