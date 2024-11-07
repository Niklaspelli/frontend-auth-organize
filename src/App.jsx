// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage"; //
import Dashboard from "./components/DashBoard.jsx";
import AdminDashboard from "./components/AdminDashboard";
import RegisterPage from "./components/RegisterPage.jsx";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />

          {/* Fallback for unknown routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
