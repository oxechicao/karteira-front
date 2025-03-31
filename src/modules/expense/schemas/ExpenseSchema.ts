import mongoose from "mongoose";
import ExpenseTemplateForm from "@modules/expenseTemplates/models/ExpenseTemplateForm";
import ExpensePaymentAtSchema from "@modules/expenseTemplates/schemas/ExpensePaymentAtSchema";
import { truncate } from "fs";

export type ExpenseModelSchema = ExpenseTemplateForm;

export interface ExpenseDocument
  extends ExpenseModelSchema,
    mongoose.Document {}

const ValueSchema = new mongoose.Schema(
  {
    precision: { type: Number, required: false, default: 2 },
    currency: { type: String, required: false, default: "BRL" },
  },
  { _id: false },
);

const DetailsSchema = new mongoose.Schema(
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

const PaymentSchema = new mongoose.Schema(
  {
    installments: [ExpensePaymentAtSchema],
    totalInstallments: {
      type: Number,
      default: 1,
      min: [1, "Mínimo de parcelas é 1"],
      required: true,
    },
    currentInstallment: { type: Number, default: 0, required: true },
    frequency: String,
    frequencyPeriod: Number,
    isRecurrent: { type: Boolean, default: false },
    isFirstPaymentNextMonth: { type: Boolean, default: false },
  },
  { _id: false },
);

export const ExpenseSchema = new mongoose.Schema<ExpenseDocument>(
  {
    karteira: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Karteira",
      required: [true, "Karteira deve ser definida"],
    },
    name: { type: String, required: true, default: "" },
    purchasedAt: { type: Date, required: true, default: Date.now },
    value: { type: Number, required: true, default: 0 },
    isFinished: { type: Boolean, required: true, default: false },
    payday: { type: Number, required: true, default: 0 },
    valueDefinition: ValueSchema,
    details: DetailsSchema,
    payment: PaymentSchema,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Expense ||
  mongoose.model<ExpenseDocument>("Expense", ExpenseSchema);
