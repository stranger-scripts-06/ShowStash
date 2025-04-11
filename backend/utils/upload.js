const multer = require('multer');
const path = require('path');

// Define storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
  }
});

// Initialize multer with the defined storage engine
const upload = multer({ storage: storage });

module.exports = upload;
