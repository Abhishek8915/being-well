const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  bookType: { type: String, enum: ['fiction', 'non-fiction', 'biography', 'science', 'history'], required: true },
  publicationDate: { type: Date, required: true },
  file: { type: String, required: true },  // URL to the uploaded book file (e.g., PDF or ePub)
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
