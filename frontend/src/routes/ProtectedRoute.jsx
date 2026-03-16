import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust path as needed

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // 1. Wait for the AuthContext to finish checking cookies
  if (loading) {
    return <div>Loading...</div>;
  }

  // 2. If not logged in, boot them to login
  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
  }

  // 3. If a specific role is required (like 'artist') and they don't have it
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate replace to="/" />; // Send them home if not an artist
  }

  // 4. Everything is good! Render the page.
  return children;
};

export default ProtectedRoute;
