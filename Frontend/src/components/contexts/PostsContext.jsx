import { createContext, useEffect, useState } from "react";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [error, setError] = useState("");

  /* const getAllPosts = async () => {
    try {
      const response = await fetch("http://localhost:9099/posts", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2YwZjg5ZjI5ODZmNDAwMTVkYTNhOGQiLCJpYXQiOjE3NDcxNzAzMjQsImV4cCI6MTc0ODM3OTkyNH0.15I8cd0VMZIYcbe7o5PdflpMwvDbqVHfpJeyGWGVRi0",
        },
      });
      const posts = await response.json();
      setPosts(posts);
      setIsPostsLoading(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsPostsLoading(false);
    }
  }; */

  const getPosts = async () => {
    try {
      setIsPostsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts`);
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("non sono riuscito a prendere nulla");

      /* console.log(e); */
    } finally {
      setIsPostsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        isPostsLoading,
        setIsPostsLoading,
        error,
        getPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
