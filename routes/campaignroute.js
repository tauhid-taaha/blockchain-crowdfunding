import express from 'express';
import multer from 'multer';
import { createOrUpdateCampaign, getCampaignById, updateVerificationStatus, getAllCampaigns } from '../controller/campaignController.js';

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder where files will be saved
  },
  filename: function (req, file, cb) {
    // Save file with a unique timestamp + original name
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post(
  '/campaign',
  upload.fields([
    { name: 'publicPhotos', maxCount: 5 },
    { name: 'privatePhotos', maxCount: 5 }
  ]),
  createOrUpdateCampaign
);

router.get('/campaign/:campaignId', getCampaignById);
router.patch('/campaign/:campaignId/verification', updateVerificationStatus);
router.get('/campaigns', getAllCampaigns);

export default router;


