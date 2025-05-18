import express from 'express';
import {
  createBkashRequest,
  getAllBkashRequests,
  updateBkashRequest
} from '../controller/bkashPaymentController.js';

const router = express.Router();

router.post('/request', createBkashRequest);         // User creates Bkash request
router.get('/requests', getAllBkashRequests);        // Admin views all requests
router.put('/request/:id', updateBkashRequest);      // Admin updates request

export default router;
