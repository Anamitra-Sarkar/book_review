import React from 'react';
import { useAuth } from '../context/AuthContext';

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const { user } = useAuth();
  const isOwner = user && review.userId._id === user.id;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white">{review.userId.name}</h4>
          <div className="flex items-center mt-1">
            {renderStars(review.rating)}
          </div>
        </div>
        {isOwner && (
          <div className="flex space-x-2">
            <button onClick={() => onEdit(review)} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm">
              Edit
            </button>
            <button onClick={() => onDelete(review._id)} className="text-red-600 hover:text-red-800 dark:text-red-400 text-sm">
              Delete
            </button>
          </div>
        )}
      </div>
      <p className="text-gray-700 dark:text-gray-300">{review.reviewText}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ReviewCard;
