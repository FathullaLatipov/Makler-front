import { useContext } from "react";
import { Navigate } from "react-router-dom";
import ContextApp from "../context/context";

const ProtectedRoute = ({ user, children }) => {
  const { loginModalFunc } = useContext(ContextApp);
  if (!user) {
    setTimeout(() => {
      loginModalFunc(true);
    }, 500);
    return <Navigate to={"/"} />;
  }

  return children;
};

export default ProtectedRoute;
