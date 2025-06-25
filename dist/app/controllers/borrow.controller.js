"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowedBooksSummary = exports.borrowBook = void 0;
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const borrowBook = (req, res, next) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { book: bookId, quantity, dueDate } = req.body;
            const book = yield book_model_1.Book.findById(bookId).lean();
            if (!book || book.copies < quantity) {
                return res.status(400).json({
                    success: false,
                    message: 'Not enough copies available',
                    error: 'Insufficient copies',
                });
            }
            book.copies -= quantity;
            yield book_model_1.Book.findByIdAndUpdate(bookId, book);
            const borrow = yield borrow_model_1.Borrow.create({ book: bookId, quantity, dueDate });
            (0, sendResponse_1.default)(res, true, 'Book borrowed successfully', borrow);
        }
        catch (err) {
            next(err);
        }
    }))();
};
exports.borrowBook = borrowBook;
const borrowedBooksSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
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
        (0, sendResponse_1.default)(res, true, 'Borrowed books summary retrieved successfully', summary);
    }
    catch (err) {
        next(err);
    }
});
exports.borrowedBooksSummary = borrowedBooksSummary;
