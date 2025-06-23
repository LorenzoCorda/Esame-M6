import { useContext, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./addPostForm.css";
import { PostsContext } from "../contexts/PostsContext";
import { Spinner } from "react-bootstrap";
import { validatePostForm } from "../../../../Backend/exception/input/validatePostForm";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { getPosts } = useContext(PostsContext);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    cover: "",
  });

  const addAuthorInput = (e) => {
    const value = e.target.value;
    setAuthor(value);

    if (value.trim().length >= 3) {
      setErrors((prev) => ({ ...prev, author: "" }));
    }
  };
  const addTitleInput = (e) => {
    const value = e.target.value;
    setTitle(value);

    if (value.trim().length >= 5) {
      setErrors((prev) => ({ ...prev, title: "" }));
    }
  };

  const addCategoryInput = (e) => {
    const value = e.target.value;
    setCategory(value);

    if (value.trim().length >= 3) {
      setErrors((prev) => ({ ...prev, category: "" }));
    }
  };

  const addContentInput = (e) => {
    const value = e.target.value;
    setContent(value);

    if (value.trim().length >= 20) {
      setErrors((prev) => ({ ...prev, content: "" }));
    }
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
      const data = await response.json();
      return data.img;
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const validationErrors = validatePostForm({
      author,
      title,
      category,
      content,
      file,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const uploadedFile = await uploadFile(file);
      const payload = {
        author: author,
        title: title,
        category: category,
        /* readTime: readTime, */
        cover: uploadedFile,
        content: content,
      };

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

        if (typeof getPosts === "function") {
          getPosts();
        }

        setTimeout(() => {
          setSuccessMessage("");
        }, 2500);
      } else {
        console.error("Error creating post");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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
          {errors.author && <h6 className="text-danger">{errors.author}</h6>}

          <input
            onChange={addTitleInput}
            className="form-control"
            type="text"
            name="title"
            placeholder="Title"
          />
          {errors.title && <h6 className="text-danger">{errors.title}</h6>}

          <input
            onChange={addCategoryInput}
            className="form-control"
            type="text"
            name="category"
            placeholder="Category"
          />
          {errors.category && (
            <h6 className="text-danger">{errors.category}</h6>
          )}

          {/*  <select name="" id="">
            <option value="">ciao</option>
          </select> */}

          <input
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setFile(selectedFile);

              if (selectedFile) {
                setErrors((prev) => ({ ...prev, file: "" }));
              }
            }}
            className="form-control"
            type="file"
            name="img"
          />
          {errors.file && <h6 className="text-danger">{errors.file}</h6>}

          {/* text area */}
          <FloatingLabel controlId="floatingTextarea2" label="Content">
            <Form.Control
              onChange={addContentInput}
              as="textarea"
              placeholder="Leave a content here"
              style={{ height: "100px" }}
            />
            {errors.content && (
              <h6 className="text-danger">{errors.content}</h6>
            )}
          </FloatingLabel>

          <button
            className="btn btn-warning mt-2"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" role="status" />
                <span className="ms-2">Creating...</span>
              </>
            ) : (
              "SEND"
            )}
          </button>

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
