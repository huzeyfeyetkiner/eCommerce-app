import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// loggedIn ile beraber giriş yapılıp yapılmama durumuna göre içerik gösteriliyor.
function ProtectedRoute({ children }) {
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
export default ProtectedRoute;
