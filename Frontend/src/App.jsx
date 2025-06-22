import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { PostsProvider } from "./components/contexts/PostsContext";
import PostDetailPage from "../pages/PostDetailsPage";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import DashBoard from "../pages/DashBoard";
import Success from "../pages/Success";

const App = () => {
  return (
    <>
      <PostsProvider>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<DashBoard />} />
            </Route>
            <Route path="/success" element={<Success />} />

            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </BrowserRouter>
      </PostsProvider>
    </>

    /*  <div className="row">
        {posts &&
          posts.length > 0 &&
          posts?.map((post) => (
            <div className="col-12 col-md-6 col-lg-4">
              <img src={post.img} alt={post.title} />
              <p>{post.title}</p>
            </div>
          ))}
      </div> */
  );
};

export default App;
