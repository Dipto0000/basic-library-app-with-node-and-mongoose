# basic-library-app-with-node-and-mongoose


##  Features

- Add, update, delete, and retrieve books
- Borrow books (with stock control)
- Aggregation summary of borrowed books
- Mongoose middleware (`pre`, `post`)
- Filtering, sorting, pagination
- Modular MVC architecture

---

##  Tech Stack

- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose
- Postman (for testing)


Run in Development

npx ts-node-dev src/server.ts

Or if you're using scripts in package.json:


npm run dev


## Api endpoints

# Books

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | `/api/books`     | Create a new book           |
| GET    | `/api/books`     | Get all books (filter/sort) |
| GET    | `/api/books/:id` | Get book by ID              |
| PUT    | `/api/books/:id` | Update a book               |
| DELETE | `/api/books/:id` | Delete a book               |


# Borrow

| Method | Endpoint      | Description                           |
| ------ | ------------- | ------------------------------------- |
| POST   | `/api/borrow` | Borrow books (check availability)     |
| GET    | `/api/borrow` | Aggregation summary of borrowed books |
