import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const goDashboard = () => {
    if (!user) return;

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/candidate");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <Link className="logo" to="/">
        CodeHire
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        {user?.role === "candidate" && <Link to="/jobs">Available Jobs</Link>}

        {user && (
          <span className="nav-link" onClick={goDashboard}>
            Dashboard
          </span>
        )}

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">SignUp</Link>}

        {user && (
          <div className="user-menu" ref={menuRef}>
            <span className="username" onClick={() => setOpen(!open)}>
              {user.name}▼
            </span>

            {open && (
              <div className="dropdown">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
