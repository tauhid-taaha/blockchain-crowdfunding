// src/layouts/AdminLayout.jsx
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #11998e, #38ef7d)", // fancy teal
        minHeight: "100vh",
        padding: "2rem",
        backgroundAttachment: "fixed",
        color: "white",
      }}
    >
      {children}
    </div>
  );
};

export default AdminLayout;
