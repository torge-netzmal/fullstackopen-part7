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
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div>
        <div>
          <a href={blog.url} target="_blank">
            {blog.url}
          </a>
        </div>
        <div>
          <div>
            likes {blog.likes ?? 0}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          {blog.user && (
            <div>
              added by{" "}
              <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
            </div>
          )}
        </div>
        {user.username === blog.user?.username && (
          <button onClick={() => handleDelete(blog)}>remove</button>
        )}
      </div>
      <h2>comments</h2>
      <form onSubmit={addComment}>
        <input {...comment.props} placeholder="write new comment here" />
        <button type="submit">add comment</button>
      </form>
      <div>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={comment + String(index)}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <p>Blog not found</p>
  );
};

export default BlogView;
