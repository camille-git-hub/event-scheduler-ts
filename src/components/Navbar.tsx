import { useAuth } from "../../../../JS/event-scheduler/src/context/AuthContext.jsx";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isAuthenticated, logoutUser } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/");
  }

  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Event Scheduler
        </Link>
      </div>

      <div className="flex-none gap-2">
        <NavLink to="/" className="btn btn-ghost">
          Home
        </NavLink>

        <NavLink to="/events" className="btn btn-ghost">
          Events
        </NavLink>

        {!isAuthenticated && (
          <>
            <NavLink to="/login" className="btn btn-ghost">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-ghost">
              Sign Up
            </NavLink>
          </>
        )}

        {isAuthenticated && (
          <button onClick={handleLogout} className="btn btn-outline">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
