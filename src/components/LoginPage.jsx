import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../utils/api";
import ReCAPTCHA from "react-google-recaptcha";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is user
  const [captchaToken, setCaptchaToken] = useState(null); // reCAPTCHA token state

  const navigate = useNavigate();

  const onChange = (token) => {
    setCaptchaToken(token); // Capture the token from reCAPTCHA
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setError("Please complete the reCAPTCHA.");
      return;
    }

    // Determine the API endpoint based on the user role (user/admin)
    const url = "/auth/login"; // Same endpoint for both user/admin in this case

    console.log("Attempting login with role:", role);

    try {
      // Make the API call for login
      const response = await apiCall(url, "POST", {
        username,
        password,
        recaptchaToken: captchaToken, // Include reCAPTCHA token in the request
      });

      console.log("API response:", response); // Log the response from the API

      // Check if login was successful (expect csrfToken in the response)
      if (response.csrfToken) {
        console.log("Login successful:", response);
        setError(null); // Clear any existing error on success
        // Navigate to the appropriate dashboard based on the role
        navigate(role === "admin" ? "/admindashboard" : "/dashboard");
      } else {
        // Handle failed login response (if no csrfToken returned)
        console.error(
          "Login failed:",
          response.message || "No message provided"
        );
        setError(response.message || "An error occurred during login.");
      }
    } catch (err) {
      console.error("Error during login process:", err.message || err);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {/* Role selection */}
        <div>
          <label>
            <input
              type="radio"
              value="user"
              checked={role === "user"}
              onChange={() => setRole("user")}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            Admin
          </label>
        </div>

        {/* Username input */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* reCAPTCHA */}
        <ReCAPTCHA
          sitekey="6LfRVngqAAAAAMk_kGrqL-7v53mBr8yff8EVJvsD" // Use your actual site key here
          onChange={onChange}
        />

        {/* Submit button */}
        <button type="submit">Login</button>

        {/* Display error message if there's an issue */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
