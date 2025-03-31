import ExpensePaymentAtSchema from "@modules/expenseTemplates/schemas/ExpensePaymentAtSchema";
import mongoose from "mongoose";

const ExpensePaymentSchema = new mongoose.Schema(
  {
    installments: [ExpensePaymentAtSchema],
    totalInstallments: {
      type: Number,
      default: 1,
      min: [1, "Mínimo de parcelas é 1"],
    },
    currentInstallment: { type: Number, default: 0, required: true },
    frequency: String,
    frequencyPeriod: String,
    isRecurrent: { type: Boolean, default: false },
    isFirstPaymentNextMonth: { type: Boolean, default: false },
  },
  { _id: false },
);

export default ExpensePaymentSchema;
