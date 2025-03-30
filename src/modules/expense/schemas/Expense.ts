import mongoose from "mongoose";
import { ExpenseModel } from "@modules/expense/models/ExpenseModel";

export interface Expense extends ExpenseModel, mongoose.Document {}

export const ExpenseDetailsSchema = new mongoose.Schema(
  {
    form: {
      type: String,
      required: [true, "Forma de pagamento obrigatória"],
    },
    type: { type: String, required: [true, "Tipo de pagamento obrigatório"] },
    source: {
      type: String,
      required: [true, "Fonte de pagamento obrigatório"],
    },
    category: {
      type: String,
      required: [true, "Categoria obrigatória"],
    },
  },
  { _id: false },
);

export const ExpensePaymentAtSchema = new mongoose.Schema(
  { date: Date, value: Number, paid: Boolean },
  { _id: false },
);

export const ExpensePaymentSchema = new mongoose.Schema(
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

export const ExpenseValueSchema = new mongoose.Schema(
  {
    precision: { type: Number, required: false, default: 2 },
    currency: { type: String, required: false, default: "BRL" },
  },
  { _id: false },
);

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
