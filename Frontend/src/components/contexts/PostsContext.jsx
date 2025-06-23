import { createContext, useEffect, useState } from "react";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [error, setError] = useState("");

  const getPosts = async () => {
    try {
      setIsPostsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts`);
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("I couldn't catch anything");
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
