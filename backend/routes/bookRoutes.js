const express = require('express');
const multer = require('multer');
const path = require('path');
const bookController = require('../controllers/bookController');

const router = express.Router();

// Setup file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Book routes
router.post('/upload', upload.single('book'), bookController.uploadBook);
router.get('/search', bookController.searchBooks);

module.exports = router;
