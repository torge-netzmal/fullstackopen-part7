import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/loginReducer.js";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    await dispatch(loginUser(username, password));
    setUsername("");
    setPassword("");
    navigate("/");
  };

  return (
    <div>
      <h2
        className={
          "flex flex-wrap text-2xl font-bold mb-2 text-gray-700 gap-2 "
        }
      >
        Login
      </h2>

      <form onSubmit={handleLogin}>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            username:
            <input
              className={
                "ml-2 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
              }
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            password:
            <input
              className={
                "ml-2 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
              }
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <button
          className={
            "rounded-lg m-3 px-2.5 py-1.5 bg-blue-400 font-semibold text-white shadow hover:bg-blue-500"
          }
          type="submit"
        >
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
