import { useContext, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./addPostForm.css";
import { PostsContext } from "../contexts/PostsContext";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  /* const [timeOut, setTimeout] = useState(null); */
  const { getPosts } = useContext(PostsContext);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    cover: "",
  });
  /* const [readTime, setReadTime] = useState(""); */

  const addAuthorInput = (e) => {
    setAuthor(e.target.value);
  };

  const addTitleInput = (e) => {
    setTitle(e.target.value);
  };
  const addCategoryInput = (e) => {
    setCategory(e.target.value);
  };
  /* const addFileInput = (e) => {
    setFile(e.target.files[0]);
  }; */
  const addContentInput = (e) => {
    setContent(e.target.value);
  };
  /* const addReadTimeInput = (e) => {
    setReadTime(e.target.value);
  }; */

  const uploadFile = async (file) => {
    const fileData = new FormData();
    fileData.append("img", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/posts/cloud-upload`,
        {
          method: "POST",
          body: fileData,
        }
      );
      /* return await response.json(); */
      const data = await response.json();
      /* console.log("Upload riuscito. URL immagine:", data.img); */
      return data.img;
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    /* console.error("nussun file caricato", file); */
    try {
      const uploadedFile = await uploadFile(file);
      /* console.log(uploadedFile); */
      const payload = {
        author: author,
        title: title,
        category: category,
        /* readTime: readTime, */
        cover: uploadedFile,
        content: content,
      };
      console.log(payload);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/posts/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setSuccessMessage("Post created!");
        // reset form se vuoi
        setFormData({
          title: "",
          content: "",
          author: "",
          category: "",
          cover: "",
        });

        // triggera aggiornamento dei post se hai una funzione tipo `fetchPosts()`
        if (typeof getPosts === "function") {
          getPosts();
        }

        setTimeout(() => {
          setSuccessMessage("");
        }, 6000);
      } else {
        console.error("Errore nel creare il post");
      }
      /* return response.json();  */ // <-- spostato qui
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="custom-form d-flex justify-content-center align-items-center">
        <form
          onSubmit={onSubmit}
          className="d-flex flex-column gap-1 mt-5"
          encType="multipart/form-data"
        >
          <input
            onChange={addAuthorInput}
            className="form-control"
            type="text"
            name="author"
            placeholder="Author"
          />
          <input
            onChange={addTitleInput}
            className="form-control"
            type="text"
            name="title"
            placeholder="Title"
          />
          <input
            onChange={addCategoryInput}
            className="form-control"
            type="text"
            name="category"
            placeholder="Category"
          />
          {/* <input
            onChange={addReadTimeInput}
            className="form-control"
            type="text"
            name="readTime"
            placeholder="ReadTime"
          /> */}
          <input
            /* onChange={addCoverInput} */
            onChange={(e) => setFile(e.target.files[0])}
            className="form-control"
            type="file"
            name="img"
          />
          {/* text area */}
          <FloatingLabel controlId="floatingTextarea2" label="Content">
            <Form.Control
              onChange={addContentInput}
              as="textarea"
              placeholder="Leave a content here"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <button className="btn btn-warning ">SEND</button>

          <div>
            {successMessage && (
              <div className="custom-message">{successMessage}</div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPostForm;
