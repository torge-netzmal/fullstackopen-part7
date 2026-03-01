import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer.js";

const BlogForm = ({ toggleComponent }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();

    dispatch(
      createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      }),
    );
    toggleComponent.current.toggleVisibility();
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };
  return (
    <form onSubmit={addBlog}>
      <div>
        title:{" "}
        <input
          className={
            "rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
          }
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          placeholder="write blog title here"
        />
      </div>
      <div>
        author:{" "}
        <input
          className={
            "rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
          }
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
          placeholder="write blog author here"
        />
      </div>
      <div>
        url:{" "}
        <input
          className={
            "rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
          }
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
          placeholder="write blog url here"
        />
      </div>
      <div>
        <button
          className={
            "rounded-lg m-3 px-2.5 py-1.5 bg-blue-400 font-semibold text-white shadow hover:bg-blue-500"
          }
          type="submit"
        >
          create
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
