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
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          placeholder="write blog title here"
        />
      </div>
      <div>
        author:{" "}
        <input
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
          placeholder="write blog author here"
        />
      </div>
      <div>
        url:{" "}
        <input
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
          placeholder="write blog url here"
        />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  );
};

export default BlogForm;
