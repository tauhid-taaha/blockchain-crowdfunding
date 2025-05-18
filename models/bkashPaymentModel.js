
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
  etherscanTxnId: { type: String },          // only when verified
  adminWalletAddress: { type: String },      // wallet used to send fund
  adminNote: { type: String },               // optional note per request
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('BkashRequest', BkashRequestSchema);
