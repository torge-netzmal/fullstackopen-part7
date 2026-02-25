import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

import { Routes, Route, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { initializeBlogs } from "./reducers/blogReducer.js";
import { initializeLogin } from "./reducers/loginReducer.js";
import Menu from "./components/Menu.jsx";
import BlogList from "./components/BlogList.jsx";
import { initializeUsers } from "./reducers/userReducer.js";
import UserList from "./components/UserList.jsx";
import UserView from "./components/UserView.jsx";
import BlogView from "./components/BlogView.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeLogin());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <Menu />

      <Notification notificationType="error" />
      <Notification notificationType="success" />

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserView />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </div>
  );
};

export default App;
