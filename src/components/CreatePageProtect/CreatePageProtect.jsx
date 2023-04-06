import { Navigate } from "react-router-dom";

const CreatePageProtect = ({ user, children }) => {
  if (!user) return <Navigate to={"/"} />;

  return children;
};

export default CreatePageProtect;
