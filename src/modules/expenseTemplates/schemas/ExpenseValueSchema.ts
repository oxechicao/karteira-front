import mongoose from "mongoose";

const ExpenseValueSchema = new mongoose.Schema(
  {
    precision: { type: Number, required: false, default: 2 },
    currency: { type: String, required: false, default: "BRL" },
  },
  { _id: false },
);

export default ExpenseValueSchema;
