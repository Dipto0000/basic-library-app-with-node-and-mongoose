import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, 'Copies must be a positive number'],
    },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
  return this.save();
};

bookSchema.pre('save', function (next) {
  console.log(`About to save book: ${this.title}`);
  next();
});

bookSchema.post('save', function (doc) {
  console.log(`Book saved successfully: ${doc.title}`);
});



export const Book = mongoose.model('Book', bookSchema);
