import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookById, deleteBook } from '../api/books';
import { addReview, updateReview, deleteReview } from '../api/reviews';
import { useAuth } from '../context/AuthContext';
import ReviewForm from '../components/ReviewForm';
import ReviewCard from '../components/ReviewCard';
import RatingChart from '../components/RatingChart';
import Loading from '../components/Loading';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const response = await getBookById(id);
      setBook(response.data.book);
      setReviews(response.data.reviews);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch book details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (reviewData) => {
    try {
      await addReview(id, reviewData);
      fetchBookDetails();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review');
    }
  };

  const handleUpdateReview = async (reviewData) => {
    try {
      await updateReview(editingReview._id, reviewData);
      setEditingReview(null);
      fetchBookDetails();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update review');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(reviewId);
        fetchBookDetails();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete review');
      }
    }
  };

  const handleDeleteBook = async () => {
    if (window.confirm('Are you sure you want to delete this book? This will also delete all reviews.')) {
      try {
        await deleteBook(id);
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete book');
      }
    }
  };

  if (loading) return <Loading />;
  if (!book) return <div className="text-center py-12">Book not found</div>;

  const isOwner = user && book.addedBy._id === user.id;
  const hasUserReviewed = reviews.some(r => r.userId._id === user?.id);

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <div className="card mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">{book.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">by {book.author}</p>
          </div>
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">{book.genre}</span>
        </div>

        <div className="flex items-center mb-4">
          <span className="text-3xl font-bold text-yellow-500 mr-2">
            {book.averageRating ? book.averageRating.toFixed(1) : 'N/A'}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            ({book.totalReviews} {book.totalReviews === 1 ? 'review' : 'reviews'})
          </span>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">{book.description}</p>

        <div className="flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">Published: {book.publishedYear}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Added by: {book.addedBy.name}</p>
        </div>

        {isOwner && (
          <div className="flex space-x-4 mt-6">
            <Link to={`/edit-book/${book._id}`} className="btn-secondary">Edit Book</Link>
            <button onClick={handleDeleteBook} className="btn-danger">Delete Book</button>
          </div>
        )}
      </div>

      {book.totalReviews > 0 && (
        <div className="mb-8">
          <RatingChart ratingDistribution={book.ratingDistribution} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  onEdit={setEditingReview}
                  onDelete={handleDeleteReview}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          {isAuthenticated ? (
            editingReview ? (
              <ReviewForm
                onSubmit={handleUpdateReview}
                initialData={editingReview}
                isEditing={true}
              />
            ) : !hasUserReviewed ? (
              <ReviewForm onSubmit={handleAddReview} />
            ) : (
              <div className="card">
                <p className="text-gray-600 dark:text-gray-400">You have already reviewed this book.</p>
              </div>
            )
          ) : (
            <div className="card">
              <p className="text-gray-600 dark:text-gray-400">
                Please <Link to="/login" className="text-primary hover:underline">login</Link> to write a review.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
