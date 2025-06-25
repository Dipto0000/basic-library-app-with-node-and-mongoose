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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.create(req.body);
        (0, sendResponse_1.default)(res, true, 'Book created successfully', book);
    }
    catch (err) {
        next(err);
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
        const query = {};
        if (filter)
            query.genre = filter;
        const books = yield book_model_1.Book.find(query)
            .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
            .limit(Number(limit));
        (0, sendResponse_1.default)(res, true, 'Books retrieved successfully', books);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findById(req.params.bookId);
        (0, sendResponse_1.default)(res, true, 'Book retrieved successfully', book);
    }
    catch (err) {
        next(err);
    }
});
exports.getBookById = getBookById;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        (0, sendResponse_1.default)(res, true, 'Book updated successfully', book);
    }
    catch (err) {
        next(err);
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield book_model_1.Book.findByIdAndDelete(req.params.bookId);
        (0, sendResponse_1.default)(res, true, 'Book deleted successfully', null);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteBook = deleteBook;
