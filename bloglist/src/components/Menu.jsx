import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/loginReducer.js";
import { useDispatch, useSelector } from "react-redux";

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);
  const handleLogout = async (event) => {
    event.preventDefault();

    dispatch(logoutUser());
  };

  const linkClasses =
    "text-gray-200 hover:text-white text-lg font-bold px-2 pb-1 pt-1 hover:shadow-[inset_0_-2px_0_0_currentColor]";

  return (
    <div
      className={
        "bg-blue-400 pt-3 shadow flex flex-row flex-nowrap justify-stretch items-end-safe "
      }
    >
      <div className={"pl-2 pr-2 pb-2 mr-1"}>
        <img src="/vite.svg" alt={"logo"} />
      </div>
      <div className={"flex divide-x-2"}>
        <Link className={linkClasses} to="/">
          blogs
        </Link>
        <Link className={linkClasses} to="/users">
          users
        </Link>
      </div>
      <div className={"flex-grow text-right"}>
        {user ? (
          <span>
            <span className={"italic text-center text-gray-500 text-xs"}>
              {user.name} logged in
            </span>
            <button
              className={
                "text-gray-300 px-1 hover:text-white mx-2 mb-2 grow-0 border-gray-500 border-1"
              }
              onClick={handleLogout}
            >
              logout
            </button>
          </span>
        ) : (
          <Link className={linkClasses} to="/login">
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Menu;
