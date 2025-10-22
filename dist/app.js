"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const book_route_1 = __importDefault(require("./routes/book.route"));
const borrow_routes_1 = __importDefault(require("./routes/borrow.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    console.log(req);
    res.send("Welcome to library management system");
});
app.use('/api/books', book_route_1.default);
app.use('/api/borrow', borrow_routes_1.default);
exports.default = app;
