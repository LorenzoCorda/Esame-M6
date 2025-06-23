import React from "react";
import { useNavigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <BaseLayout>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <h2 className="mb-3">Page Not Found</h2>
        <p className="mb-4">Oops! The page you're looking for doesn't exist.</p>
        <img
          src="https://media.istockphoto.com/id/1481759725/it/foto/errore-404-isolato-su-sfondo-bianco-pagina-non-trovata.jpg?b=1&s=612x612&w=0&k=20&c=0zrBexjbNrSYSIxtvW7waHH1u4NCEZY0ZtBO_fn0Yi4="
          alt=""
        />
        <button className="btn btn-primary mt-2" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </BaseLayout>
  );
};

export default NotFoundPage;
