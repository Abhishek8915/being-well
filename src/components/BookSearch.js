import React, { useState, useEffect } from "react";
import axios from "axios";

const BookSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (query.trim()) {
      // Make the API call to search books by title/author
      const response = await axios.get("/api/books/search", {
        params: { q: query },
      });
      onSearch(response.data);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search for books by title or author"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default BookSearch;
