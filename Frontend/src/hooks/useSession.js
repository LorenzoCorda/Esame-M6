import { jwtDecode } from "jwt-decode";
import { isToken } from "../middleware/ProtectedRoutes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useSession = () => {
  const session = isToken();
  const decodedSession = session ? jwtDecode(session) : null;

  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/", { replace: true });
    }
  });
  return decodedSession;
};

export default useSession;
