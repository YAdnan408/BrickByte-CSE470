import express from 'express';
import { uploadAvatar as uploadAvatarController, uploadListingImages as uploadListingImagesController } from '../controllers/upload.controller.js';
import { uploadAvatar, uploadListingImages } from '../middleware/upload.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Upload avatar
router.post('/avatar', verifyToken, uploadAvatar, uploadAvatarController);

// Upload listing images
router.post('/listing-images', verifyToken, uploadListingImages, uploadListingImagesController);

export default router;
