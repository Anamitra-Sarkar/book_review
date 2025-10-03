import React, { useState } from 'react';

const SearchBar = ({ onSearch, onFilter, onSort }) => {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Romance', 'Biography', 'History', 'Fantasy'];

  const handleSearchClick = () => {
    onSearch(search);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(search);
    }
  };

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setGenre(value);
    onFilter(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSort(value);
  };

  const handleClear = () => {
    setSearch('');
    onSearch('');
  };

  return (
    <div className="card mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            🔍 Search Books
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Book title or author..."
              className="input-field flex-1"
            />
            <button 
              onClick={handleSearchClick}
              className="btn-primary px-4 py-2 whitespace-nowrap"
            >
              Search
            </button>
            {search && (
              <button 
                onClick={handleClear}
                className="btn-secondary px-3 py-2"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Press Enter or click Search
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            📚 Filter by Genre
          </label>
          <select value={genre} onChange={handleGenreChange} className="input-field">
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            ⚡ Sort By
          </label>
          <select value={sortBy} onChange={handleSortChange} className="input-field">
            <option value="createdAt">🆕 Newest First</option>
            <option value="publishedYear">📅 Publication Year</option>
            <option value="averageRating">⭐ Highest Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

