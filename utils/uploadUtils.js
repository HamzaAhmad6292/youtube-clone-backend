// utils/uploadUtils.js

const multer = require('multer');

// Define storage for uploaded videos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/videos'); // Specify the directory where videos will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename the video file
  }
});

// Create Multer instance
const upload = multer({ storage: storage });

module.exports = upload;
