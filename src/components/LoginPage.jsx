import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginFunction = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // This tells the browser to include httpOnly cookies in requests
      });

      if (response.ok) {
        const data = await response.json(); // Handle any non-cookie response data (e.g., user ID)

        // Optionally set userId if the server returns it
        const userIdFromResponse = data.userId || "12345"; // Adjust based on API response
        setUserId(userIdFromResponse);

        // Clear any existing errors
        setError(null);

        // Navigate the user to the dashboard upon successful login
        navigate("/dashboard");
      } else {
        // Handle login failure
        const errorData = await response.json();
        setError(errorData.message || "Invalid username or password");
      }
    } catch (err) {
      // Handle network or unexpected errors
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={loginFunction}>
        <h2>Login</h2>

        {/* Username input */}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Password input */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Error message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Submit button */}
        <button type="submit">Login</button>
      </form>

      {/* Display userId on successful login */}
      {userId && <p>Logged in user ID: {userId}</p>}

      <div>
        <p>Don’t have an account?</p>
        <Link to="./register">Register here</Link>
      </div>
    </div>
  );
};

export default LoginPage;
