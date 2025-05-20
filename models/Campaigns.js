// models/Campaign.js
import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  campaignId: {
    type: String,
    required: true,
    unique: true
  },
  phone: String,
  publicPhotos: {
    type: [String],
    default: []
  },
  privatePhotos: {
    type: [String],
    default: []
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'unverified', 'on-hold'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Campaign = mongoose.model('Campaign', CampaignSchema);

export default Campaign;
