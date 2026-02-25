import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/loginReducer.js";
import { useDispatch, useSelector } from "react-redux";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);
  const handleLogout = async (event) => {
    event.preventDefault();

    dispatch(logoutUser());
  };

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user ? (
        <span>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </span>
      ) : (
        <Link style={padding} to="/login">
          login
        </Link>
      )}
    </div>
  );
};

export default Menu;
