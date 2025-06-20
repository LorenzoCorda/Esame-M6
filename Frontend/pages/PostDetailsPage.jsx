import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PostsContext } from "../src/components/contexts/PostsContext";
import PostDetail from "../src/components/detailsPost/DetailsPost";
import BaseLayout from "../layouts/BaseLayout";

const PostDetailPage = () => {
  const { id, asin } = useParams();
  const { posts } = useContext(PostsContext);

  console.log(posts);

  const selectedPost = posts.find((post) => String(post._id) === String(id));

  return (
    <>
      <BaseLayout>
        <div className="container">
          <PostDetail post={selectedPost} />
        </div>
      </BaseLayout>
    </>
  );
};

export default PostDetailPage;
