import { useContext } from "react";
import { Navigate } from "react-router-dom";
import TokenContext from "../../contexts/TokenContext";

const WithAuth = ({ children }) => {
  const { token } = useContext(TokenContext);
  if (!token) return <Navigate to="/login" />;
  return <div>{children}</div>;
};

export default WithAuth;
