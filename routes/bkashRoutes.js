import express from 'express';
import {
  createBkashRequest,
  getAllBkashRequests,
  updateBkashRequest,
  getBkashRequestsByUsername
} from '../controller/bkashPaymentController.js';

const router = express.Router();

router.post('/request', createBkashRequest);         // User creates Bkash request
router.get('/requests', getAllBkashRequests);        // Admin views all requests
router.put('/request/:id', updateBkashRequest);
router.get('/requests/user/:username', getBkashRequestsByUsername);      // Admin updates request

export default router;
