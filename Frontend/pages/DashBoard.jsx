import { useNavigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import AddPostForm from "../src/components/addPostForm/addPostForm";
import Posts from "../src/components/posts/Posts";
import useSession from "../src/hooks/useSession";

const DashBoard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const user = useSession();

  return (
    <>
      <BaseLayout>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>{`Benvenuto ${user.name}`}</h1>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
        <AddPostForm />
        <Posts />
      </BaseLayout>
    </>
  );
};

export default DashBoard;
