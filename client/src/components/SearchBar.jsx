import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or roll no..."
        className="grow px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-r-lg hover:bg-gray-800 transition duration-300 dark:bg-gray-600 dark:hover:bg-gray-500"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
