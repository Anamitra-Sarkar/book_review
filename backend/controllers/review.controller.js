import Review from '../models/review.model.js';
import Book from '../models/book.model.js';

/**
 * @route   POST /api/reviews/:bookId
 * @desc    Add a review for a book
 * @access  Protected
 */
export const addReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating, reviewText } = req.body;

    // Validate input
    if (!rating || !reviewText) {
      return res.status(400).json({
        success: false,
        message: 'Please provide rating and review text'
      });
    }

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({
      bookId,
      userId: req.user.id
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this book'
      });
    }

    // Create review
    const review = await Review.create({
      bookId,
      userId: req.user.id,
      rating,
      reviewText
    });

    // Populate user info
    await review.populate('userId', 'name email');

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: review
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding review',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/reviews/:reviewId
 * @desc    Update a review
 * @access  Protected (only review owner)
 */
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user is the owner
    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this review'
      });
    }

    // Update review
    const { rating, reviewText } = req.body;

    if (rating) review.rating = rating;
    if (reviewText) review.reviewText = reviewText;

    await review.save();
    await review.populate('userId', 'name email');

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: review
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating review',
      error: error.message
    });
  }
};

/**
 * @route   DELETE /api/reviews/:reviewId
 * @desc    Delete a review
 * @access  Protected (only review owner)
 */
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user is the owner
    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this review'
      });
    }

    // Delete review
    await Review.findByIdAndDelete(req.params.reviewId);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting review',
      error: error.message
    });
  }
};