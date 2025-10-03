import React, { useState } from 'react';

const ReviewForm = ({ onSubmit, initialData = null, isEditing = false }) => {
  const [rating, setRating] = useState(initialData?.rating || 5);
  const [reviewText, setReviewText] = useState(initialData?.reviewText || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!reviewText.trim()) {
      setError('Review text is required');
      return;
    }

    if (reviewText.trim().length < 5) {
      setError('Review must be at least 5 characters long');
      return;
    }

    onSubmit({ rating, reviewText });
    if (!isEditing) {
      setRating(5);
      setReviewText('');
    }
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
        {isEditing ? 'Edit Review' : 'Write a Review'}
      </h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Rating: {rating} / 5
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Your Review
        </label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows="4"
          className="input-field"
          placeholder="Share your thoughts about this book..."
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        {isEditing ? 'Update Review' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
