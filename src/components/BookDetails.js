import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams(); // Extract book ID from the URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details from the server by book ID
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]); // Run when the ID changes

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Published: {book.publishedDate}</p>
      <p>Book Type: {book.bookType}</p>
      <p>{book.description}</p>
      <button onClick={() => window.open(`/uploads/${book.file}`, "_blank")}>
        Read Now
      </button>
    </div>
  );
};

export default BookDetails;
