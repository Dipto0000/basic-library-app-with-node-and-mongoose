import { Document, Types } from 'mongoose';

export interface IBorrow {
  _id?: string;
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
