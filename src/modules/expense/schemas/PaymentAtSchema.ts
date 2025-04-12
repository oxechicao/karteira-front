import mongoose from "mongoose";

export const PaymentAtSchema = new mongoose.Schema(
  { date: Date, value: Number, isPaid: Boolean },
  { _id: false },
);
