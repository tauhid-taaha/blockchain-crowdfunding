import BkashRequest from '../models/bkashPaymentModel.js';

export const createBkashRequest = async (req, res) => {
  try {
    const { username, campaignId, bkashTxnNumber } = req.body;
    const request = new BkashRequest({ username, campaignId, bkashTxnNumber });
    await request.save();
    res.status(201).json({ success: true, request });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

export const getAllBkashRequests = async (req, res) => {
  try {
    const requests = await BkashRequest.find().sort({ updatedAt: -1 });
    res.status(200).json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

export const updateBkashRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, etherscanTxnId, adminWalletAddress, adminNote } = req.body;

    const request = await BkashRequest.findById(id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    request.status = status || request.status;
    request.etherscanTxnId = etherscanTxnId || request.etherscanTxnId;
    request.adminWalletAddress = adminWalletAddress || request.adminWalletAddress;
    request.adminNote = adminNote || request.adminNote;
    request.updatedAt = Date.now();

    await request.save();
    res.status(200).json({ success: true, message: 'Request updated', request });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};