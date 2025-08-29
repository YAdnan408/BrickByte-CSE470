import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = '';
    
    if (req.route.path.includes('avatar') || req.originalUrl.includes('avatar') || req.originalUrl.includes('update')) {
      uploadPath = path.join(__dirname, '../uploads/avatars');
    } else if (req.route.path.includes('listing') || req.originalUrl.includes('listing')) {
      uploadPath = path.join(__dirname, '../uploads/listings');
    } else {
      uploadPath = path.join(__dirname, '../uploads');
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
  fileFilter: fileFilter
});

// Export different upload configurations
export const uploadAvatar = upload.single('avatar');
export const uploadListingImages = upload.array('images', 6); // Max 6 images
export const uploadSingle = upload.single('image');

export default upload;
