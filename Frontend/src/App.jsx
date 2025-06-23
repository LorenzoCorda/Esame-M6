import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { PostsProvider } from "../src/components/contexts/PostsContext";
import PostDetailPage from "../pages/PostDetailsPage";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import DashBoard from "../pages/DashBoard";
import Success from "../pages/Success";
import NotFoundPage from "../pages/NotFoundPage";
import Post from "../../Frontend/src/components/posts/Posts";

const App = () => {
  return (
    <>
      <PostsProvider>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="/posts" element={<Post />} />

            <Route path="/post/:id" element={<PostDetailPage />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<DashBoard />} />
            </Route>
            <Route path="/success" element={<Success />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </PostsProvider>
    </>
  );
};

export default App;
