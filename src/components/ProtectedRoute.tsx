import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../../JS/event-scheduler/src/context/AuthContext.jsx";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="p-6 text-center">
        <span className="loading loading-spinner loading-md"></span>
        <p className="mt-2">Checking login...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
