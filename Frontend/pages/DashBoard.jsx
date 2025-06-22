import { useNavigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import AddPostForm from "../src/components/addPostForm/addPostForm";
import Posts from "../src/components/posts/Posts";
import useSession from "../src/hooks/useSession";
import { useState, useEffect } from "react";

const DashBoard = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    return () => clearTimeout(timer); // pulizia se il componente viene smontato prima
  }, []);

  const user = useSession();

  return (
    <>
      <BaseLayout>
        <div className="container">
          <div className="row">
            <div className="col d-flex justify-content-between mt-3">
              {showWelcome && (
                <h3>{`Welcome ${
                  user?.name || user?.displayName || user?.username || "Utente"
                }`}</h3>
              )}
              <div className="end-0 position-absolute me-2">
                <button className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              </div>
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
