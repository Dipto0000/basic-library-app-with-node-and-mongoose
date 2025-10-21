
import { Request, Response, NextFunction } from 'express';
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/book.model';
import sendResponse from '../../utils/sendResponse';

export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, quantity, dueDate } = req.body;

    // Validate request body
    if (!bookId || !quantity || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Validate available copies
    if (book.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough copies available',
      });
    }

    // Update copies count
    book.copies -= quantity;
    if (book.copies === 0) book.available = false;
    await book.save();

    // Create borrow record
    const borrow = await Borrow.create({
      book: book._id,
      quantity,
      dueDate,
    });

    sendResponse(res, true, 'Book borrowed successfully', borrow);
  } catch (err) {
    next(err);
  }
};


export const borrowedBooksSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
      { $unwind: '$bookDetails' },
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookDetails.title',
            isbn: '$bookDetails.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);
    sendResponse(res, true, 'Borrowed books summary retrieved successfully', summary);
  } catch (err) {
    next(err);
  }
};