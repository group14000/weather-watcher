import React from "react";

const Search = ({ setSearch, searchPressed }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Enter city/town..."
        className="p-2 border border-gray-400 rounded mr-2"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={searchPressed}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
