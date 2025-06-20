import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "./SinglePost.css";
import { useState } from "react";

const SinglePost = ({ post }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="col-12 col-md-6 col-lg-3 mt-4 custom-card">
        <Card>
          <Card.Img className="custom-img" variant="top" src={post.cover} />
          <Card.Body>
            <Card.Title className="text-warning">{post.title}</Card.Title>
            <Card.Text className="text-truncate">{post.content}</Card.Text>
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
