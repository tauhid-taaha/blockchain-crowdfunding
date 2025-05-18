import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const BkashSuccessModal = ({ open, onClose, transaction, amount, campaignTitle }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Box sx={modalStyle}>
          <FaCheckCircle className="text-green-500 mx-auto mb-2" size={64} />
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Campaign:</strong> {campaignTitle}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Amount:</strong> ৳{amount}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Bkash Txn:</strong> {transaction}
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2, borderRadius: "20px", px: 4 }}
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </motion.div>
    </Modal>
  );
};

export default BkashSuccessModal;
