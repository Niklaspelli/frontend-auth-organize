// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage"; // Adjust the path as necessary
import Dashboard from "./components/DashBoard.jsx"; // Adjust the path as necessary
import RegisterPage from "./components/RegisterPage.jsx";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Fallback for unknown routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
