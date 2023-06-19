import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// loggedIn ile beraber giriş yapılıp yapılmama durumuna göre içerik gösteriliyor.
function ProtectedRoute({ children, admin }) {
  const { loggedIn, user } = useAuth();

  // admin rolü için gerekli olan protected route işlemi
  if (admin && user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  if (loggedIn) {
    return children;
  }

  return <Navigate to="/" />;
}
export default ProtectedRoute;
