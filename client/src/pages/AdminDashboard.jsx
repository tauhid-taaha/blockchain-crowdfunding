import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  FaUserShield,
  FaCheckCircle,
  FaTools,
  FaChartBar,
} from "react-icons/fa";

// Fancy color palette
const palette = {
  primary: ["#00F5A0", "#00D9F5"],
  secondary: ["#FF6FD8", "#3813C2"],
  accent: ["#FDC830", "#F37335"],
  neutral: ["#667eea", "#764ba2"],
  darkTeal: ["#0f2027", "#203a43", "#2c5364"],
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const adminActions = [
    {
      title: "Verify Bkash Requests",
      description: "Review and verify Bkash donations submitted by users.",
      icon: <FaCheckCircle size={28} />,
      onClick: () => navigate("/admin-bkash-requests"),
      bg: `linear-gradient(135deg, #43cea2, #185a9d)`,
    },
    {
      title: "Analytics & Stats",
      description: "Visualize traffic, donations, and engagement data.",
      icon: <FaChartBar size={28} />,
      onClick: () => alert("Coming soon..."),
      bg: `linear-gradient(135deg, #11998e, #38ef7d)`,
    },
    {
      title: "System Settings",
      description: "Manage admin tools and integrations.",
      icon: <FaTools size={28} />,
      onClick: () => alert("Coming soon..."),
      bg: `linear-gradient(135deg, #667eea, #764ba2)`,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 5,
        background: `linear-gradient(to right, ${palette.darkTeal.join(", ")})`,
        color: "#fff",
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        fontWeight="900"
        sx={{
          mb: 6,
          background: "linear-gradient(to right, #00F5A0, #00D9F5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Admin Control Center
      </Typography>

      {/* Admin Info Card */}
    
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <Paper
    elevation={6}
    sx={{
      display: "flex",
      alignItems: "center",
      p: 4,
      gap: 4,
      borderRadius: "20px",
      background: "rgba(255, 255, 255, 0.07)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      transition: "0.3s",
      "&:hover": {
        boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
        transform: "scale(1.01)",
      },
    }}
  >
    <Box sx={{ position: "relative" }}>
      <Avatar
        sx={{
          width: 90,
          height: 90,
          bgcolor: "#00f5a0",
          color: "#000",
          border: "3px solid #fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        <FaUserShield size={36} />
      </Avatar>
      {/* Badge effect */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          bgcolor: "#00d9f5",
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: "2px solid #fff",
          boxShadow: "0 0 10px #00f5a0",
        }}
      />
    </Box>
    <Box>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          background: "linear-gradient(to right, #00F5A0, #00D9F5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {user?.name || "Admin User"}
      </Typography>
      <Typography
        sx={{
          color: "#d1d1d1",
          fontStyle: "italic",
          mt: 0.5,
        }}
      >
        Email: {user?.email || "admin@example.com"}
      </Typography>
      <Box
        sx={{
          mt: 1.5,
          display: "inline-block",
          px: 2,
          py: 0.5,
          fontSize: 13,
          borderRadius: "999px",
          background: "linear-gradient(90deg, #00F5A0, #00D9F5)",
          color: "#000",
          fontWeight: "bold",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
        }}
      >
        Role: Admin
      </Box>
    </Box>
        
        </Paper>
      </motion.div>

      {/* Action Buttons */}
      <Grid container spacing={4} sx={{ mt: 6 }}>
        {adminActions.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 0.5 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <Paper
                onClick={item.onClick}
                elevation={4}
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: "16px",
                  textAlign: "center",
                  background: item.bg,
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: "0 8px 22px rgba(0,0,0,0.25)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <Box mb={2}>{item.icon}</Box>
                <Typography variant="h6" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ opacity: 0.9, mt: 1, lineHeight: 1.6 }}
                >
                  {item.description}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
