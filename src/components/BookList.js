import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import BookSearch from "./BookSearch";
import BookFilters from "./BookFilters";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  // Fetch all books from the server
  const fetchBooks = async () => {
    try {
      const response = await axios.get("/api/books");
      setBooks(response.data);
      setFilteredBooks(response.data); // Initially display all books
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Fetch books whenever search query or filter changes
  useEffect(() => {
    const applyFilters = () => {
      let filtered = books;

      if (searchQuery.trim()) {
        filtered = filtered.filter((book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (filter) {
        filtered = filtered.filter((book) => book.bookType === filter);
      }

      setFilteredBooks(filtered);
    };

    applyFilters();
  }, [searchQuery, filter, books]);

  // Handle search input change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  // Handle the Read Now button click
  const handleReadClick = (book) => {
    window.open(`/uploads/${book.file}`, "_blank");
  };

  return (
    <div className="p-4">
      <BookSearch onSearch={handleSearchChange} />
      <BookFilters onFilterChange={handleFilterChange} />

      <div className="flex flex-wrap">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} onReadClick={handleReadClick} />
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
