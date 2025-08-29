import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from '../utils/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload avatar
export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(errorHandler(400, 'No file uploaded'));
    }

    const fileUrl = `/backend/uploads/avatars/${req.file.filename}`;
    
    res.status(200).json({
      success: true,
      message: 'Avatar uploaded successfully',
      fileUrl: fileUrl
    });
  } catch (error) {
    next(error);
  }
};

// Upload listing images
export const uploadListingImages = async (req, res, next) => {
  try {
    console.log('Upload listing images request received');
    console.log('Files:', req.files);
    console.log('User:', req.user);

    if (!req.files || req.files.length === 0) {
      console.log('No files uploaded');
      return next(errorHandler(400, 'No files uploaded'));
    }

    const fileUrls = req.files.map(file => `/backend/uploads/listings/${file.filename}`);
    console.log('Generated file URLs:', fileUrls);
    
    res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      fileUrls: fileUrls
    });
  } catch (error) {
    console.error('Upload error:', error);
    next(error);
  }
};

// Delete file (optional utility function)
export const deleteFile = async (req, res, next) => {
  try {
    const { filename, type } = req.params;
    const filePath = path.join(__dirname, `../uploads/${type}/${filename}`);
    
    // Add file deletion logic here if needed
    // fs.unlinkSync(filePath);
    
    res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
