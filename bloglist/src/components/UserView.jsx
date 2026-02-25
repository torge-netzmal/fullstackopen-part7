import { Link, useMatch } from "react-router-dom";
import { useSelector } from "react-redux";

const UserView = () => {
  const match = useMatch("/users/:id");
  const user = useSelector((state) =>
    match ? state.users.find((user) => user.id === match.params.id) : null,
  );

  return user ? (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>User not found</p>
  );
};

export default UserView;
