// src/utils/api.js
const USERS_API_URL = "http://localhost:3000/api"; // Users API
const ADMIN_API_URL = "http://localhost:4000/api"; // Admin API

export const apiCall = async (url, method, data, isAdmin = false) => {
  const baseUrl = isAdmin ? ADMIN_API_URL : USERS_API_URL; // Determine base URL based on admin status

  const response = await fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include", // Include cookies in the request
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong!");
  }

  return await response.json(); // Return JSON response
};
