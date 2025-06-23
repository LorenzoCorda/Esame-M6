import React, { useContext, useState, useEffect } from "react";
import "./detailsPost.css";
import Spinner from "react-bootstrap/Spinner";
import { PostsContext } from "../contexts/PostsContext";
import CommentForm from "../comments/CommentForm";
import { useNavigate } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";

const PostDetail = ({ post }) => {
  const { isPostsLoading, setIsPostsLoading } = useContext(PostsContext);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (post?.comments?.length > 0) {
      setComments(post.comments);
    }
  }, [post]);

  const startEditing = (comment) => {
    setEditingCommentId(comment._id);
    setEditingText(comment.text);
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/posts/${
          post._id
        }/comments/${editingCommentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: editingText }),
        }
      );
      if (res.ok) {
        const updated = await res.json();
        setComments(comments.map((c) => (c._id === updated._id ? updated : c)));
        setEditingCommentId(null);
        setEditingText("");
      }
    } catch (err) {
      console.error("Edit comment error", err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/posts/${
          post._id
        }/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setComments(comments.filter((c) => c._id !== commentId));
      }
    } catch (err) {
      console.error("Comment deletion error", err);
    }
  };

  const handleCommentSubmit = async ({ author, text }) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/posts/${post._id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ author, text }),
        }
      );
      if (res.ok) {
        const newComment = await res.json();
        setComments([...comments, newComment]);
      }
    } catch (err) {
      console.error("Error sending comment", err);
    }
  };

  if (isPostsLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="grow" variant="warning" />
        <h4 className="text-dark ms-1">Loading...</h4>
      </div>
    );
  }

  if (!post) return <p>Neo book selected.</p>;

  return (
    <div className="row">
      <div className="col-12">
        <div className="ms-3 mt-3">
          <button
            className="btn btn-outline-secondary d-flex align-items-center gap-2"
            onClick={() => navigate("/posts")}
          >
            <ArrowBigLeft size={20} />
            Back
          </button>
        </div>
        <div className="d-flex flex-column mb-4 border rounded mt-5 ms-5 me-5">
          <img className="img-custom mt-3 w-100" src={post.cover} alt="cover" />
          <div className="d-flex flex-column align-items-center mt-5">
            <h3 className="text-warning">
              <strong>{post.title}</strong>
            </h3>
            <h4 className="text-danger">
              <strong>Category:</strong> {post.category}
            </h4>
            <p>
              <strong>Content:</strong>
            </p>
            <div className="d-flex ms-4 me-4 m-2 mb-4">{post.content}</div>
          </div>
        </div>
        <div className="d-flex flex-column">
          {comments.map((comment) => (
            <div key={comment._id} className="mb-2 p-2 border rounded">
              <strong>{comment.author}</strong>

              {editingCommentId === comment._id ? (
                <div className="d-flex flex-column gap-2 mt-2">
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    rows={3}
                    className="form-control"
                  />
                  <div className="d-flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="btn btn-sm btn-success"
                    >
                      Salva
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="btn btn-sm btn-secondary"
                    >
                      Annulla
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p>{comment.text}</p>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => startEditing(comment)}
                    >
                      Modifica
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(comment._id)}
                    >
                      Elimina
                    </button>
                  </div>
                </>
              )}
              <small>{new Date(comment.createdAt).toLocaleString()}</small>
            </div>
          ))}
          <div className="border rounded p-3 mb-4">
            <h3 className="d-flex justify-content-center mt-4 mb-4">
              What do you think about this post?
            </h3>
            <CommentForm onSubmit={handleCommentSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
