import express from 'express';
import { addBook, getAllBooks, getBookById, updateBook, deleteBook } from '../controllers/book.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, addBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', authMiddleware, updateBook);
router.delete('/:id', authMiddleware, deleteBook);

export default router;

