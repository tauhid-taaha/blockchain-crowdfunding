import mongoose from 'mongoose';

const bkashPaymentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  campaignId: { type: String, required: true },
  txnNumber: { type: String, required: true },
  status: { type: String, enum: ['pending', 'verified', 'declined'], default: 'pending' },
  adminWalletAddress: { type: String },
  etherscanId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('BkashPayment', bkashPaymentSchema);
