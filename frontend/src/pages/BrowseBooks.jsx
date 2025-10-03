import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../api/books';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BrowseBooks = () => {
  const { isAuthenticated } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    search: '',
    genre: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  useEffect(() => {
    fetchBooks();
  }, [filters]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await getAllBooks(filters.page, filters);
      setBooks(response.data.books);
      setPagination(response.data.pagination);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (search) => {
    setFilters({ ...filters, search, page: 1 });
  };

  const handleFilter = (genre) => {
    setFilters({ ...filters, genre, page: 1 });
  };

  const handleSort = (sortBy) => {
    setFilters({ ...filters, sortBy, page: 1 });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && filters.page === 1) return <Loading />;

  return (
    <div className="min-h-screen">
      {/* Hero Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-12 px-4 mb-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeIn">
              📚 Browse All Books
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-6">
              Discover your next favorite read from our community collection
            </p>
            {isAuthenticated && (
              <Link to="/add-book" className="inline-block bg-white text-indigo-600 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                ➕ Add Your Book
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Search & Filter Section */}
        <SearchBar onSearch={handleSearch} onFilter={handleFilter} onSort={handleSort} />

        {/* Stats Bar */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md">
          <div className="flex flex-wrap justify-around gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {pagination.totalBooks || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Books</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {pagination.currentPage || 1}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Current Page</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                {pagination.booksPerPage || 5}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Books Per Page</div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg border-l-4 border-red-500">
            ⚠️ {error}
          </div>
        )}

        {books.length === 0 && !loading ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">📖</div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              No books found
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Be the first to add a book to our collection!
            </p>
            {isAuthenticated && (
              <Link to="/add-book" className="btn-primary inline-block">
                ➕ Add First Book
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Books Grid with Animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {books.map((book, index) => (
                <div 
                  key={book._id} 
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseBooks;

