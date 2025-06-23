import { useContext } from "react";
import SinglePost from "../singlePost/SinglePost";
import { PostsContext } from "../contexts/PostsContext";
import Spinner from "react-bootstrap/Spinner";
import BaseLayout from "../../../layouts/BaseLayout";

const Posts = () => {
  const { posts, isPostsLoading } = useContext(PostsContext);
  if (isPostsLoading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <Spinner animation="grow" variant="warning" />

        <h4 className="text-dark">Loading...</h4>
      </div>
    );
  }
  return (
    <>
      <BaseLayout>
        <div className="container-fluid bg-white p-4">
          <div className="row">
            {posts &&
              posts.map((post, idx) => (
                <SinglePost key={`post-${post._id}-${idx}`} post={post} />
              ))}
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default Posts;
