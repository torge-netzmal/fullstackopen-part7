import { Link, useMatch } from "react-router-dom";
import { useSelector } from "react-redux";

const UserView = () => {
  const match = useMatch("/users/:id");
  const user = useSelector((state) =>
    match ? state.users.find((user) => user.id === match.params.id) : null,
  );

  return user ? (
    <div>
      <h1
        className={
          "flex flex-wrap text-4xl font-bold mb-2 text-gray-700 gap-2 "
        }
      >
        {user.name}
      </h1>
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
          added blogs
        </h2>
        <ul className={"space-y-2"}>
          {user.blogs.map((blog) => (
            <li
              className={
                "rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              }
              key={blog.id}
            >
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <p>User not found</p>
  );
};

export default UserView;
