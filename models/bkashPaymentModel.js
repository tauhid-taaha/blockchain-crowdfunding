
// models/BkashRequest.js
import mongoose from 'mongoose';

const BkashRequestSchema = new mongoose.Schema({
  username: { type: String, required: true },
  campaignId: { type: String, required: true }, // referencing blockchain campaign by ID (string or number as string)
  bkashTxnNumber: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'verified', 'declined'],
    default: 'pending'
  },
  etherscanTxnId: { type: String,default: 'Waiting for Approval' },          // only when verified
  adminWalletAddress: { type: String,default: 'Verifying' },      // wallet used to send fund
  adminNote: { type: String ,default: 'Verifying'},  
  confirmedamount: { type: String },             // optional note per request
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('BkashRequest', BkashRequestSchema);
