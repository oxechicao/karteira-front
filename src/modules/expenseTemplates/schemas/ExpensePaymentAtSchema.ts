import mongoose from "mongoose";

const ExpensePaymentAtSchema = new mongoose.Schema(
  { date: Date, value: Number, paid: Boolean },
  { _id: false },
);

export default ExpensePaymentAtSchema;
