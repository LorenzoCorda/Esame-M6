import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "./SinglePost.css";

const SinglePost = ({ post }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="col-12 col-md-6 col-lg-3 mt-4 custom-card">
        <Card>
          <Card.Img className="custom-img" variant="top" src={post.cover} />
          <Card.Body>
            <Card.Title className="text-warning">
              <span className="text-dark">Author:</span>
              {post.author}
            </Card.Title>

            <Card.Text className="text-warning">
              <span className="text-dark">Title:</span>
              {post.title}
            </Card.Text>
            <Card.Text className="text-truncate">
              <span className="text-dark">Category:</span>

              {post.category}
            </Card.Text>
            <span className="text-dark">Content:</span>

            <Card.Text className="text-truncate text-white">
              {post.content}
            </Card.Text>
            <Button
              className="custom-btn"
              onClick={() => navigate(`/post/${post._id}`)}
              variant="warning"
            >
              Details
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SinglePost;
