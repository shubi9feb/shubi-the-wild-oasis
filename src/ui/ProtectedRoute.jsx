import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1.load authenticated user
  const { isAuthenticated, isLoading } = useUser();
  //3. only login users can access
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate]
  );
  //2. show spinner if user is loading
  if (isLoading) return <Spinner />;

  return children;
}

export default ProtectedRoute;
