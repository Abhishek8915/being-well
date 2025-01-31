import React from "react";

const BookFilters = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    onFilterChange(selectedFilter);
  };

  return (
    <div className="filters-container">
      <select onChange={handleFilterChange} className="filter-select">
        <option value="">Select Book Type</option>
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-fiction</option>
        <option value="biography">Biography</option>
        <option value="science">Science</option>
        <option value="history">History</option>
      </select>
    </div>
  );
};

export default BookFilters;
