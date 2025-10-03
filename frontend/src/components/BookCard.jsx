import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <Link to={`/books/${book._id}`} className="block group">
      <div className="card hover:scale-105 transition-all duration-300 h-full flex flex-col bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 border-2 border-transparent hover:border-indigo-500">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {book.title}
          </h3>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md">
            {book.genre}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 flex items-center">
          <span className="mr-2">✍️</span>
          <span className="font-medium">by {book.author}</span>
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
          {book.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-1">
            {renderStars(book.averageRating || 0)}
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-2">
              {book.averageRating ? book.averageRating.toFixed(1) : 'No ratings'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              📅 {book.publishedYear}
            </span>
          </div>
        </div>

        {/* Hover effect indicator */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-center text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
            Click to see details →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;

