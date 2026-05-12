// components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo2 from '../components/images/logo2.jpeg'

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  // Check if user is admin (temporary check by email)
  const isAdmin = user?.email === "migoaron793@gmail.com";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 sticky-top">
      <NavLink className="navbar-brand text-warning fw-bold" to="/">
        <div className="nav img">
          <img 
            src={logo2} 
            className="d-block" 
            height="100px" 
            width="250px" 
            alt="logo" 
          />
        </div>
        <h3 className="title head"></h3>
      </NavLink>

      {/* Mobile toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">

          {/* Always visible */}
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Buses available
            </NavLink>
          </li>

          {/* Admin Hub - only visible to admin */}
          {isAdmin && (
            <li className="nav-item">
              <NavLink to="/busreservation" className="nav-link">
                Admin Hub
              </NavLink>
            </li>
          )}

          {/* Conditional Rendering based on login status */}
          {user ? (
            <>
              {/* Username */}
              <li className="nav-item">
                <span className="nav-link text-success fw-bold">
                  👋 {user.username || user.email}
                </span>
              </li>

              {/* Logout */}
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-danger ms-2"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink to="/signup" className="nav-link">
                  Signup
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/signin" className="nav-link">
                  Signin
                </NavLink>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;