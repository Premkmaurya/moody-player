import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AddSong from "../pages/AddSong";
import ProtectedRoute from "./ProtectedRoute"; // Import the wrapper

const AppRoute = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected: Any logged-in user */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Protected: Only Artists */}
      <Route
        path="/add-song"
        element={
          <ProtectedRoute requiredRole="artist">
            <AddSong />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoute;
