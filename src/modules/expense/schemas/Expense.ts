import mongoose from "mongoose";
import { ExpenseModel } from "@modules/expense/models/ExpenseModel";
import { ExpenseDetailsSchema } from "@modules/expenseTemplates/schemas/ExpenseDetailsSchema";
import { ExpensePaymentSchema } from "@modules/expenseTemplates/schemas/ExpensePaymentSchema";
import { ExpenseValueSchema } from "@modules/expenseTemplates/schemas/ExpenseValueSchema";

export interface Expense extends ExpenseModel, mongoose.Document {}

export const ExpenseSchema = new mongoose.Schema<Expense>(
  {
    karteira: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Karteira",
      required: [true, "Karteira deve ser definida"],
    },
    name: { type: String, required: [true, "Nome obrigatório"] },
    purchasedAt: { type: Date, required: [true, "Data de compra obrigatória"] },
    value: { type: Number, required: [true, "Valor obrigatório"] },
    isFinished: { type: Boolean, default: false },
    payday: Number,
    valueDefinition: ExpenseValueSchema,
    details: ExpenseDetailsSchema,
    payment: ExpensePaymentSchema,
  },
  { timestamps: true },
);

export default mongoose.models.Expense ||
  mongoose.model<Expense>("Expense", ExpenseSchema);
