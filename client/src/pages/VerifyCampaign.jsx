import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Stack,
  InputLabel,
  FormHelperText,
  useTheme,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { AiOutlineCloudUpload, AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";

const VerifyCampaign = () => {
  const { state } = useLocation(); // expects { campaignId }
  const navigate = useNavigate();
  const theme = useTheme();

  const [phone, setPhone] = useState("");
  const [publicPhotos, setPublicPhotos] = useState([]);
  const [privatePhotos, setPrivatePhotos] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' | 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePublicPhotosChange = (e) => setPublicPhotos([...e.target.files]);
  const handlePrivatePhotosChange = (e) => setPrivatePhotos([...e.target.files]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!phone.trim()) {
      setMessage("Please enter your phone number.");
      setMessageType("error");
      return;
    }

    if (publicPhotos.length === 0) {
      setMessage("Please upload at least one public photo.");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("campaignId", state.campaignId);
      formData.append("phone", phone);
      publicPhotos.forEach((file) => formData.append("publicPhotos", file));
      privatePhotos.forEach((file) => formData.append("privatePhotos", file));

      const res = await axios.post("http://localhost:5173/api/v1/campaigns/campaign", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setMessage("✅ Verification request submitted successfully!");
        setMessageType("success");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage("❌ Submission failed.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage(`Server error: ${error.response?.data?.message || error.message}`);
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        maxWidth: 480,
        mx: "auto",
        mt: 10,
        p: 4,
        bgcolor: "#121212",
        borderRadius: 3,
        boxShadow:
          "0 4px 15px rgba(255, 0, 128, 0.4), 0 0 30px rgba(255, 0, 128, 0.2)",
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          "radial-gradient(circle at top left, #ff007f33 0%, transparent 50%), radial-gradient(circle at bottom right, #00ffff33 0%, transparent 50%)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="900"
        mb={3}
        color="#ff00a6"
        textAlign="center"
        sx={{ textShadow: "0 0 12px #ff00a6" }}
      >
        Verify Your Campaign
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Campaign ID"
          value={state?.campaignId || ""}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
            sx: {
              color: "#ff00a6",
              fontWeight: "bold",
              letterSpacing: 1,
              borderColor: "#ff00a6",
            },
          }}
          sx={{
            "& .MuiInputBase-root": {
              bgcolor: "#1e1e1e",
              borderRadius: 1,
            },
            "& label": { color: "#ff00a6" },
            mb: 2,
          }}
        />

        <TextField
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
          required
          type="tel"
          placeholder="+8801XXXXXXXXX"
          InputProps={{
            sx: {
              bgcolor: "#1e1e1e",
              color: "white",
              borderRadius: 1,
              "&::placeholder": { color: "#ccc" },
            },
          }}
          InputLabelProps={{
            sx: { color: "#ff00a6" },
          }}
        />

        <Stack spacing={1} mt={3} mb={1}>
          <InputLabel
            htmlFor="public-photos"
            sx={{ color: "#00fff7", fontWeight: "bold" }}
          >
            Public Photos (required)
          </InputLabel>
          <Button
            variant="contained"
            component="label"
            color="secondary"
            startIcon={<AiOutlineCloudUpload />}
            sx={{
              bgcolor: "#ff007f",
              ":hover": { bgcolor: "#ff3399" },
              fontWeight: "bold",
            }}
          >
            Upload Public Photos
            <input
              hidden
              id="public-photos"
              type="file"
              accept="image/*"
              multiple
              onChange={handlePublicPhotosChange}
            />
          </Button>
          <FormHelperText sx={{ color: "#888" }}>
            {publicPhotos.length
              ? `${publicPhotos.length} file(s) selected`
              : "Select one or more public photos."}
          </FormHelperText>
        </Stack>

        <Stack spacing={1} mt={3} mb={3}>
          <InputLabel
            htmlFor="private-photos"
            sx={{ color: "#00fff7", fontWeight: "bold" }}
          >
            Private Photos (optional)
          </InputLabel>
          <Button
            variant="contained"
            component="label"
            color="secondary"
            startIcon={<AiOutlineCloudUpload />}
            sx={{
              bgcolor: "#008080",
              ":hover": { bgcolor: "#00b3b3" },
              fontWeight: "bold",
            }}
          >
            Upload Private Photos
            <input
              hidden
              id="private-photos"
              type="file"
              accept="image/*"
              multiple
              onChange={handlePrivatePhotosChange}
            />
          </Button>
          <FormHelperText sx={{ color: "#888" }}>
            {privatePhotos.length
              ? `${privatePhotos.length} file(s) selected`
              : "Select one or more private photos (optional)."}
          </FormHelperText>
        </Stack>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          sx={{
            bgcolor: "#ff00a6",
            ":hover": { bgcolor: "#ff3399" },
            fontWeight: "bold",
            py: 1.8,
            fontSize: "1.1rem",
            boxShadow: "0 0 15px #ff00a6",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Verification"}
        </Button>

        {message && (
          <Alert
            severity={messageType}
            sx={{
              mt: 4,
              fontWeight: "medium",
              bgcolor: messageType === "success" ? "#004d40" : "#4a0000",
              color: "white",
              boxShadow:
                messageType === "success"
                  ? "0 0 10px #00ff94"
                  : "0 0 10px #ff0044",
              borderRadius: 2,
              alignItems: "center",
            }}
            iconMapping={{
              success: <AiFillCheckCircle style={{ fontSize: 26 }} />,
              error: <AiFillCloseCircle style={{ fontSize: 26 }} />,
            }}
            onClose={() => setMessage("")}
          >
            {message}
          </Alert>
        )}
      </form>
    </Box>
  );
};

export default VerifyCampaign;
