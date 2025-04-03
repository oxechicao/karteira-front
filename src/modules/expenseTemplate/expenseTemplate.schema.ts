import { ExpenseTemplateForm } from "@modules/expenseTemplate/expenseTemplate.type";
import mongoose from "mongoose";

export type ExpenseTemplateSchemaModel = {
  templateName: string;
  isAnonymous: boolean;
  template: ExpenseTemplateForm;
};

export interface ExpenseTemplateDocument
  extends ExpenseTemplateSchemaModel,
    mongoose.Document {}

export const ExpenseTemplatePaymentAtSchema = new mongoose.Schema(
  { date: Date, value: Number, isPaid: Boolean },
  { _id: false },
);

const ExpenseValueSchema = new mongoose.Schema(
  {
    precision: { type: Number, required: false, default: 2 },
    currency: { type: String, required: false, default: "BRL" },
  },
  { _id: false },
);

const ExpensePaymentSchema = new mongoose.Schema(
  {
    installments: [ExpenseTemplatePaymentAtSchema],
    totalInstallments: {
      type: Number,
      default: 1,
      min: [1, "Mínimo de parcelas é 1"],
    },
    currentInstallment: { type: Number, default: 0, required: true },
    frequency: String,
    frequencyPeriod: String,
    isRecurrent: { type: Boolean, default: false },
  },
  { _id: false },
);

const ExpenseDetailsSchema = new mongoose.Schema(
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

const ExpenseTemplateModelSchema = new mongoose.Schema(
  {
    karteira: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Karteira",
      required: [true, "KarteiraSchema deve ser definida"],
    },
    name: { type: String, required: false, default: "" },
    purchasedAt: { type: Date, required: false, default: Date.now },
    value: { type: Number, required: false, default: 0 },
    isFinished: { type: Boolean, required: false, default: false },
    payday: { type: Number, required: false, default: 0 },
    valueDefinition: ExpenseValueSchema,
    details: ExpenseDetailsSchema,
    payment: ExpensePaymentSchema,
  },
  { _id: false },
);

const ExpenseTemplateSchema = new mongoose.Schema<ExpenseTemplateDocument>(
  {
    templateName: { type: String, required: true },
    isAnonymous: { type: Boolean, required: false, default: false },
    template: ExpenseTemplateModelSchema,
  },
  { timestamps: true },
);

export default mongoose.models.ExpenseTemplate ||
  mongoose.model<ExpenseTemplateDocument>(
    "ExpenseTemplate",
    ExpenseTemplateSchema,
  );
