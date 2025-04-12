import mongoose from "mongoose";

export const ValueSchema = new mongoose.Schema(
  {
    precision: { type: Number, required: false, default: 2 },
    currency: { type: String, required: false, default: "BRL" },
  },
  { _id: false },
);
