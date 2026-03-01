import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div
      className={
        "border-1 border-gray-300  bg-gray-200  p-2 m-2 rounded-lg shadow"
      }
    >
      <div>
        <Link to={`/blogs/${blog.id}`}>
          <span className={"text-md font-semibold"}>{blog.title}</span>
          <span className={"px-2 text-sm text-gray-500 italic"}>
            {blog.author}
          </span>
        </Link>
      </div>
    </div>
  );
};
export default Blog;
