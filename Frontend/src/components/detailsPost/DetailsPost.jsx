import React, { useContext } from "react";
/* import "./PostDetailsStyle.css"; */
import Spinner from "react-bootstrap/Spinner";
import { PostsContext } from "../contexts/PostsContext";

const PostDetail = ({ post }) => {
  const { isPostsLoading, setIsPostsLoading } = useContext(PostsContext);

  if (isPostsLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="grow" variant="warning" />
        <h4 className="text-dark">Loading...</h4>
      </div>
    );
  }

  if (!post) return <p>Nessun libro selezionato.</p>;

  return (
    <div className="row">
      <div className="col-12 d-flex flex-column">
        <div className="mt-4 p-3">
          <div className="d-flex justify-content-center">
            <img className="img-custom" src={post.cover} alt="" />
          </div>
          <div className="details-custom d-flex flex-column m-4">
            <div className="d-flex flex-column align-items-center text-start">
              <h2 className="text-warning">
                <strong>{post.title}</strong>
              </h2>
              <h5 className="text-warning">
                <strong>Category:</strong> {post.category}
              </h5>
            </div>

            {/* {Form comments} */}
            {/* <div className="mt-5">
              <h4>Add a Comment:</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="form-control"
                    placeholder="Write a comment..."
                    required
                  />
                </div>
                <div className="mb-2">
                  <label>Rating (1-10): </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="form-control w-25"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Send
                </button>
              </form>

              <div className="mt-4">
                <h5>Comments:</h5>
                {commentsList.length === 0 && <p>No comments yet.</p>}
                <ul className="list-group">
                  {commentsList.map((c) => (
                    <li
                      key={c.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>Rating:</strong> {c.rating}/10
                        <br />
                        {c.text}
                      </div>
                      <div className="btn-group">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleEdit(c.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => handleDelete(c.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

{
  /* List comments */
}
