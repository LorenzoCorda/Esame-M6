import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { replace, useNavigate, useSearchParams } from "react-router-dom";

const Success = () => {
  const [queryParams] = useSearchParams();
  const token = queryParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Decodifica opzionale
      const decodedToken = jwtDecode(token);

      localStorage.setItem("token", token);
      // Naviga alla dashboard subito dopo aver salvato il token
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 3000);
    }
  }, [token, navigate]);

  return (
    <div>
      <h2 className="d-flex justify-content-center align-items-center">
        Login avvenuto con successo, verrai reindirizzato nella Dashboard!
      </h2>
    </div>
  );
};

export default Success;
