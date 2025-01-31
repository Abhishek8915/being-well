import React from 'react';

const BookCard = ({ book, onReadClick }) => {
  return (
    <div className="flex flex-col items-center justify-center border p-4 m-2 rounded-lg">
      <img src={book.coverImage} alt={book.title} className="h-40 w-40 object-cover" />
      <h2 className="text-xl font-bold">{book.title}</h2>
      <p className="text-sm">{book.author}</p>
      <p className="text-gray-600">{book.description}</p>
      <button
        onClick={() => onReadClick(book)}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Read Now
      </button>
    </div>
  );
};

export default BookCard;
