const Book = require('../models/Book');
const fs = require('fs');
const path = require('path');

// Upload a book
exports.uploadBook = (req, res) => {
  const { title, author, description, bookType, publicationDate } = req.body;
  const file = req.file;

  const newBook = new Book({
    title,
    author,
    description,
    bookType,
    publicationDate,
    file: file.path,
  });

  newBook.save()
    .then(book => res.json(book))
    .catch(err => res.status(500).json({ message: 'Error uploading book', error: err }));
};

// Search for books
exports.searchBooks = (req, res) => {
  const query = req.query.q;
  const filter = req.query.filter;
  
  const conditions = filter ? { bookType: filter } : {};
  
  Book.find(conditions)
    .where('title').regex(query, 'i') // Case insensitive search
    .or([{ 'author': new RegExp(query, 'i') }])
    .then(books => res.json(books))
    .catch(err => res.status(500).json({ message: 'Error fetching books', error: err }));
};
