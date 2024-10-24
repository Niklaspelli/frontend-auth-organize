import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function DashBoard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a request to the backend logout endpoint
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST", // Or 'GET', depending on your backend
        credentials: "include", // Ensure cookies are included
      });

      if (response.ok) {
        // Clear any frontend stored tokens (e.g., CSRF tokens)
        localStorage.removeItem("csrfToken");

        // Redirect to the login page or home page
        navigate("/"); // Redirects to the login page
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default DashBoard;
