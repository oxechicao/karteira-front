import { ExpenseModel } from "@modules/expense/models/ExpenseModel";
import mongoose from "mongoose";

export interface ExpenseEntity extends mongoose.Document, ExpenseModel { }

const ExpenseSchema = new mongoose.Schema<ExpenseEntity>({
  definition: {
    form: { color: String, name: String },
    type: { color: String, name: String },
    source: { color: String, name: String },
    category: { color: String, name: String }
  },
  installment: { current: Number, total: Number },
  name: { type: String, required: [true, "Nome da Despesa deve ser definido"] },
  timeline: { lastPaymentAt: Date, purchasedAt: Date, paymentsAt: [Date] },
  value: { precision: Number, currency: String, value: Number, firstInstallmentAdditionalValue: Number }
});

export default mongoose.models.Expense || mongoose.model<ExpenseEntity>("expense", ExpenseSchema);