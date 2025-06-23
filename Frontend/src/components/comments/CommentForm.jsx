import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState({ author: "", text: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!comment.author.trim() || comment.author.trim().length < 2) {
      e.author = "Name must be at least 2 characters.";
    }
    if (!comment.text.trim() || comment.text.trim().length < 3) {
      e.text = "Comment must be at least 3 characters.";
    }
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment((c) => ({ ...c, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    if (typeof onSubmit === "function") {
      onSubmit(comment);
    }
    setComment({ author: "", text: "" });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="commentAuthor">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="author"
          value={comment.author}
          onChange={handleChange}
          isInvalid={!!errors.author}
        />
        <Form.Control.Feedback type="invalid">
          {errors.author}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="commentText" className="mt-2">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="text"
          value={comment.text}
          onChange={handleChange}
          isInvalid={!!errors.text}
        />
        <Form.Control.Feedback type="invalid">
          {errors.text}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" className="mt-3">
        Send
      </Button>
    </Form>
  );
};

export default CommentForm;
