import mongoose from "mongoose";

const ExpensePaymentAtSchema = new mongoose.Schema(
  { date: Date, value: Number, isPaid: Boolean },
  { _id: false },
);

export default ExpensePaymentAtSchema;
