import Book from '../models/book.model.js';
import Review from '../models/review.model.js';

/**
 * @route   POST /api/books
 * @desc    Add a new book
 * @access  Protected
 */
export const addBook = async (req, res) => {
  try {
    const { title, author, description, genre, publishedYear } = req.body;

    // Validate input
    if (!title || !author || !description || !genre || !publishedYear) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create book
    const book = await Book.create({
      title,
      author,
      description,
      genre,
      publishedYear,
      addedBy: req.user.id
    });

    // Populate addedBy field
    await book.populate('addedBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: book
    });
  } catch (error) {
    console.error('Add book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding book',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/books
 * @desc    Get all books with pagination, search, filter, and sort
 * @access  Public
 * 
 * OPTIMIZED VERSION: Uses MongoDB aggregation for rating sort
 * This prevents loading all books into memory - scales to millions of books
 */
export const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    // Search and filter parameters
    const search = req.query.search || '';
    const genre = req.query.genre || '';
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    // Build query
    let query = {};

    // Text search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    // Genre filter
    if (genre) {
      query.genre = genre;
    }

    // Get total count
    const total = await Book.countDocuments(query);

    // OPTIMIZED: Use aggregation for rating sort (scales to millions of books)
    if (sortBy === 'averageRating') {
      const pipeline = [
        { $match: query },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'bookId',
            as: 'reviews'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'addedBy',
            foreignField: '_id',
            as: 'addedByUser'
          }
        },
        {
          $addFields: {
            averageRating: {
              $cond: {
                if: { $gt: [{ $size: '$reviews' }, 0] },
                then: { $avg: '$reviews.rating' },
                else: 0
              }
            },
            addedBy: { $arrayElemAt: ['$addedByUser', 0] }
          }
        },
        {
          $project: {
            title: 1,
            author: 1,
            description: 1,
            genre: 1,
            publishedYear: 1,
            averageRating: 1,
            createdAt: 1,
            updatedAt: 1,
            'addedBy._id': 1,
            'addedBy.name': 1,
            'addedBy.email': 1
          }
        },
        { $sort: { averageRating: sortOrder } },
        { $skip: skip },
        { $limit: limit }
      ];

      const books = await Book.aggregate(pipeline);

      return res.status(200).json({
        success: true,
        data: {
          books,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalBooks: total,
            booksPerPage: limit
          }
        }
      });
    }

    // Normal sorting (publishedYear, createdAt, etc.)
    const sortObj = {};
    sortObj[sortBy] = sortOrder;

    const books = await Book.find(query)
      .populate('addedBy', 'name email')
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean();

    // Add average rating to each book
    const booksWithRatings = await Promise.all(
      books.map(async (book) => {
        const reviews = await Review.find({ bookId: book._id });
        const avgRating = reviews.length > 0
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : 0;
        return { ...book, averageRating: avgRating };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        books: booksWithRatings,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalBooks: total,
          booksPerPage: limit
        }
      }
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching books',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/books/:id
 * @desc    Get single book details
 * @access  Public
 */
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('addedBy', 'name email')
      .lean();

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Get all reviews for this book
    const reviews = await Review.find({ bookId: req.params.id })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    // Calculate average rating
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

    // Calculate rating distribution
    const ratingDistribution = {
      1: reviews.filter(r => r.rating === 1).length,
      2: reviews.filter(r => r.rating === 2).length,
      3: reviews.filter(r => r.rating === 3).length,
      4: reviews.filter(r => r.rating === 4).length,
      5: reviews.filter(r => r.rating === 5).length
    };

    res.status(200).json({
      success: true,
      data: {
        book: {
          ...book,
          averageRating: avgRating,
          totalReviews: reviews.length,
          ratingDistribution
        },
        reviews
      }
    });
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching book',
      error: error.message
    });
  }
};

/**
 * @route   PUT /api/books/:id
 * @desc    Update a book
 * @access  Protected (only book owner)
 */
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Check if user is the owner
    if (book.addedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this book'
      });
    }

    // Update book
    const { title, author, description, genre, publishedYear } = req.body;

    if (title) book.title = title;
    if (author) book.author = author;
    if (description) book.description = description;
    if (genre) book.genre = genre;
    if (publishedYear) book.publishedYear = publishedYear;

    await book.save();
    await book.populate('addedBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: book
    });
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating book',
      error: error.message
    });
  }
};

/**
 * @route   DELETE /api/books/:id
 * @desc    Delete a book
 * @access  Protected (only book owner)
 */
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Check if user is the owner
    if (book.addedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this book'
      });
    }

    // Delete all reviews associated with this book
    await Review.deleteMany({ bookId: req.params.id });

    // Delete book
    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Book and associated reviews deleted successfully'
    });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting book',
      error: error.message
    });
  }
};