import mongoose, { Schema } from 'mongoose';

const borrowSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

borrowSchema.post('save', function (doc) {
  console.log(`Borrow record created for book ID: ${doc.book} | Quantity: ${doc.quantity}`);
});

export const Borrow = mongoose.model('Borrow', borrowSchema);