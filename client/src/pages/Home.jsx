import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home({ onLogout }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    // You can fetch user data from API here if needed
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-content">
          <h1>LawyerEddit</h1>
          <div className="nav-user">
            {username && <span>Welcome, {username}!</span>}
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="home-content">
        <div className="welcome-section">
          <h2>Welcome to LawyerEddit</h2>
          <p>Share and discuss legal topics with the community.</p>
        </div>

        <div className="main-area">
          <p>Debates and discussions will appear here.</p>
        </div>
      </div>
    </div>
  );
}
