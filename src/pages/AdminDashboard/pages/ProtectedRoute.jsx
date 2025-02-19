import { Navigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export default function ProtectedRoute( {children} ) {
  
  const tokenAdmin = localStorage.getItem("tokenAdmin");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // const token = localStorage.getItem("token");

  if (!tokenAdmin  && !isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
}
