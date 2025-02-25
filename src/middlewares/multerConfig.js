import multer from 'multer';
import path from 'path';

// Storage configuration
// this will ensure the path where the images iwll be uploaded
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this path exists
  },
//   this will insure the name of file that it mlust be unique 
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
    // this will ensure the file type of the images
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, and PNG files are allowed!'), false);
  }
};

// Multer upload setup
const upload = multer({
  storage: storage,
//   this will limite the size of image
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: fileFilter
});

export default upload;
