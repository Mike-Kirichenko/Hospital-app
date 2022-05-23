import { Navigate } from "react-router-dom";

const WithAuth = (props) => {
  const token = null;
  if (!token) return <Navigate to="/login" />;
  return <div>{props.children}</div>;
};

export default WithAuth;
