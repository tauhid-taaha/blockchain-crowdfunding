import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
  Modal,
  Grid,
  IconButton,
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CommentIcon from '@mui/icons-material/Comment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

const STATUS_OPTIONS = [
  { value: 'verified', label: 'Verified', icon: <CheckCircleIcon color="success" /> },
  { value: 'unverified', label: 'Unverified', icon: <CancelIcon color="error" /> },
  { value: 'on-hold', label: 'On Hold', icon: <HourglassEmptyIcon color="warning" /> },
];

export default function AdminValidation() {
  const [campaignRecords, setCampaignRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [status, setStatus] = useState('');
  const [comment, setComment] = useState('');
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [modalPhotoSrc, setModalPhotoSrc] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get('http://localhost:5173/api/v1/campaigns/campaigns')
      .then(res => setCampaignRecords(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const handleVerify = async () => {
    if (!selectedRecord) return;
    try {
      await axios.patch(
        `http://localhost:5173/api/v1/campaigns/campaign/${selectedRecord.campaignId}/verification`,
        { verificationStatus: status, comment }
      );
      alert('Status updated!');
      setSelectedRecord(null);
      setStatus('');
      setComment('');
      const res = await axios.get('http://localhost:5173/api/v1/campaigns/campaigns');
      setCampaignRecords(res.data.data);
    } catch {
      alert('Failed to update');
    }
  };

  const openPhotoModal = (src) => {
    setModalPhotoSrc(src);
    setPhotoModalOpen(true);
  };

  const closePhotoModal = () => {
    setPhotoModalOpen(false);
    setModalPhotoSrc(null);
  };

  if (!campaignRecords.length) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: theme.palette.background.default,
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const statusColors = {
    verified: theme.palette.success.main,
    unverified: theme.palette.error.main,
    'on-hold': theme.palette.warning.main,
  };

  return (
    <Box
      sx={{
        p: { xs: 3, md: 6 },
        bgcolor: '#f5f7fa',
        minHeight: '100vh',
        fontFamily: "'Poppins', sans-serif",
        color: '#222',
      }}
    >
      {!selectedRecord ? (
        <>
          <Typography variant="h4" fontWeight="700" mb={4} color="#1976d2">
            Campaign Records
          </Typography>
          <Grid container spacing={4}>
            {campaignRecords.map((record) => (
              <Grid item xs={12} sm={6} md={4} key={record._id}>
                <Card
                  onClick={() => setSelectedRecord(record)}
                  sx={{
                    cursor: 'pointer',
                    bgcolor: '#fff',
                    borderRadius: 3,
                    boxShadow: '0 3px 15px rgba(0,0,0,0.1)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 10px 30px rgba(25, 118, 210, 0.3)',
                    },
                  }}
                  elevation={2}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="700"
                      noWrap
                      gutterBottom
                      sx={{ color: '#1976d2' }}
                    >
                      Campaign: {record.campaignId || 'No ID'}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontWeight: '600',
                        color: statusColors[record.verificationStatus] || '#666',
                        textTransform: 'capitalize',
                      }}
                    >
                      {record.verificationStatus === 'verified' && <CheckCircleIcon />}
                      {record.verificationStatus === 'unverified' && <CancelIcon />}
                      {record.verificationStatus === 'on-hold' && <HourglassEmptyIcon />}
                      <Typography component="span">{record.verificationStatus || 'Unknown'}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Button
            startIcon={<ArrowBackIosNewIcon />}
            onClick={() => setSelectedRecord(null)}
            sx={{ mb: 4, color: '#1976d2', fontWeight: '600' }}
          >
            Back to list
          </Button>

          <Card
            sx={{
              mb: 5,
              p: 4,
              bgcolor: '#fff',
              borderRadius: 3,
              boxShadow: '0 6px 20px rgba(25, 118, 210, 0.15)',
            }}
          >
            <Typography variant="h5" fontWeight="700" mb={2} color="#1976d2">
              Campaign Details
            </Typography>
            <Typography variant="body1" mb={1}>
              <strong>Campaign ID:</strong> {selectedRecord.campaignId || 'N/A'}
            </Typography>
            <Typography variant="body1" mb={1}>
              <strong>Phone:</strong> {selectedRecord.phone || 'N/A'}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: '700',
                color: statusColors[selectedRecord.verificationStatus] || '#666',
                textTransform: 'capitalize',
                mt: 1,
              }}
            >
              {selectedRecord.verificationStatus === 'verified' && <CheckCircleIcon />}
              {selectedRecord.verificationStatus === 'unverified' && <CancelIcon />}
              {selectedRecord.verificationStatus === 'on-hold' && <HourglassEmptyIcon />}
              <Typography component="span">{selectedRecord.verificationStatus || 'Unknown'}</Typography>
            </Box>
          </Card>

          {/* Photos Section */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h6" fontWeight="700" mb={2} color="#1976d2">
              Public Photos
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {selectedRecord.publicPhotos?.length ? (
                selectedRecord.publicPhotos.map((url, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <motion.img
                      src={`http://localhost:8080${url}`}
                      alt="public"
                      style={{
                        width: '100%',
                        height: 260,
                        borderRadius: 15,
                        objectFit: 'cover',
                        cursor: 'pointer',
                        boxShadow: '0 3px 12px rgba(25, 118, 210, 0.1)',
                        userSelect: 'none',
                      }}
                      whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(25, 118, 210, 0.3)' }}
                      onClick={() => openPhotoModal(`http://localhost:8080${url}`)}
                      draggable={false}
                    />
                  </Grid>
                ))
              ) : (
                <Typography color="text.secondary" fontStyle="italic">
                  No public photos available
                </Typography>
              )}
            </Grid>

            <Typography variant="h6" fontWeight="700" mb={2} color="#1976d2">
              Private Photos
            </Typography>
            <Grid container spacing={3}>
              {selectedRecord.privatePhotos?.length ? (
                selectedRecord.privatePhotos.map((url, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <motion.img
                      src={`http://localhost:8080${url}`}
                      alt="private"
                      style={{
                        width: '100%',
                        height: 260,
                        borderRadius: 15,
                        objectFit: 'cover',
                        cursor: 'pointer',
                        boxShadow: '0 3px 12px rgba(255, 152, 0, 0.15)',
                        userSelect: 'none',
                      }}
                      whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(255, 152, 0, 0.35)' }}
                      onClick={() => openPhotoModal(`http://localhost:8080${url}`)}
                      draggable={false}
                    />
                  </Grid>
                ))
              ) : (
                <Typography color="text.secondary" fontStyle="italic">
                  No private photos available
                </Typography>
              )}
            </Grid>
          </Box>

          {/* Verification Form */}
          <Card
            sx={{
              p: 4,
              bgcolor: '#fff',
              borderRadius: 3,
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography variant="h6" fontWeight="700" mb={3} color="#1976d2">
              Update Verification Status
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
              onSubmit={(e) => {
                e.preventDefault();
                handleVerify();
              }}
            >
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                displayEmpty
                required
                sx={{ borderRadius: 2, fontWeight: '600' }}
                renderValue={(selected) => {
                  if (!selected) return <em>Select Status</em>;
                  const option = STATUS_OPTIONS.find((o) => o.value === selected);
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {option?.icon}
                      {option?.label}
                    </Box>
                  );
                }}
              >
                <MenuItem disabled value="">
                  <em>Select Status</em>
                </MenuItem>
                {STATUS_OPTIONS.map(({ value, label, icon }) => (
                  <MenuItem key={value} value={value} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {icon}
                    {label}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                label="Add Comment (optional)"
                variant="outlined"
                multiline
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ borderRadius: 2 }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!status}
                sx={{
                  alignSelf: 'flex-start',
                  fontWeight: '700',
                  px: 5,
                  py: 1.5,
                  borderRadius: 3,
                }}
              >
                Submit
              </Button>
            </Box>
          </Card>

          {/* Photo Modal */}
          <Modal
            open={photoModalOpen}
            onClose={closePhotoModal}
            aria-labelledby="photo-modal"
            closeAfterTransition
            slotProps={{
              backdrop: {
                sx: {
                  backdropFilter: 'blur(6px)',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                },
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                outline: 'none',
                borderRadius: 3,
                overflow: 'hidden',
                maxWidth: '90vw',
                maxHeight: '90vh',
                boxShadow: 24,
                bgcolor: 'background.paper',
              }}
            >
              <IconButton
                onClick={closePhotoModal}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'grey.600',
                  zIndex: 10,
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <img
                src={modalPhotoSrc}
                alt="Enlarged"
                style={{ maxWidth: '100%', maxHeight: '90vh', display: 'block' }}
                draggable={false}
              />
            </Box>
          </Modal>
        </>
      )}
    </Box>
  );
}



