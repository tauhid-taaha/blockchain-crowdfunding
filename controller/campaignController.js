import Campaign from '../models/Campaigns.js';

export const createOrUpdateCampaign = async (req, res) => {
  try {
    const { campaignId, phone } = req.body;

    console.log('campaignId:', campaignId);
    console.log('phone:', phone);
    console.log('publicPhotos:', req.files?.publicPhotos);
    console.log('privatePhotos:', req.files?.privatePhotos);

    if (!campaignId) {
      return res.status(400).json({ success: false, message: 'campaignId is required' });
    }

    // Map uploaded files to URLs or paths
    const publicPhotos = req.files?.publicPhotos?.map(file => `/uploads/${file.filename}`) || [];
    const privatePhotos = req.files?.privatePhotos?.map(file => `/uploads/${file.filename}`) || [];

    const updated = await Campaign.findOneAndUpdate(
      { campaignId },
      { phone, publicPhotos, privatePhotos },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getCampaignById = async (req, res) => {
  try {
    const { campaignId } = req.params;

    const campaign = await Campaign.findOne({ campaignId });

    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    res.status(200).json({ success: true, data: campaign });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateVerificationStatus = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { verificationStatus } = req.body;

    const campaign = await Campaign.findOneAndUpdate(
      { campaignId },
      { verificationStatus },
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    res.status(200).json({ success: true, data: campaign });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAllCampaigns = async (req, res) => {
  try {
    const { verificationStatus } = req.query;
    const filter = verificationStatus ? { verificationStatus } : {};

    const campaigns = await Campaign.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: campaigns });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
