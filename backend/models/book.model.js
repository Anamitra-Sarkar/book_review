import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    minlength: [1, 'Title must not be empty']
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
    minlength: [1, 'Author name must not be empty']
  },
  description: {
    type: String,
    required: [true, 'Book description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true
  },
  publishedYear: {
    type: Number,
    required: [true, 'Published year is required'],
    min: [1000, 'Published year must be valid'],
    max: [new Date().getFullYear(), 'Published year cannot be in the future']
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for search functionality
bookSchema.index({ title: 'text', author: 'text' });

const Book = mongoose.model('Book', bookSchema);

export default Book;