import { Request, Response, NextFunction } from 'express';
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/book.model';
import sendResponse from '../../utils/sendResponse';

export const borrowBook = (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const { book: bookId, quantity, dueDate } = req.body;
      const book = await Book.findById(bookId).lean();
      if (!book || book.copies < quantity) {
        return res.status(400).json({
          success: false,
          message: 'Not enough copies available',
          error: 'Insufficient copies',
        });
      }

      book.copies -= quantity;
      await Book.findByIdAndUpdate(bookId, book);

      const borrow = await Borrow.create({ book: bookId, quantity, dueDate });
      sendResponse(res, true, 'Book borrowed successfully', borrow);
    } catch (err) {
      next(err);
    }
  })();
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