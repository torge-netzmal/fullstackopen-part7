import { useState, useImperativeHandle } from "react";

const Togglable = ({ ref, buttonLabelHide, buttonLabelShow, children }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div className={"flex"}>
      <div
        className={
          "w-auto shrink-0 rounded-lg px-2.5 py-1.5 bg-green-400 font-semibold text-white shadow hover:bg-green-500"
        }
        style={hideWhenVisible}
      >
        <button onClick={toggleVisibility}>{buttonLabelShow ?? "show"}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button
          className={
            "rounded-lg px-2.5 py-1.5 bg-red-400 font-semibold text-white shadow hover:bg-red-500"
          }
          onClick={toggleVisibility}
        >
          {buttonLabelHide ?? "hide"}
        </button>
      </div>
    </div>
  );
};

export default Togglable;
