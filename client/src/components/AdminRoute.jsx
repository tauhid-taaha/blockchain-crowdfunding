import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust path as needed

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // If no user or user is not admin
  if (!user || user.role !== 1) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
