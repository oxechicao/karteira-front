import mongoose from "mongoose";
import { ExpenseModel } from "@modules/expense/models/ExpenseModel";

export interface Expense extends ExpenseModel, mongoose.Document {
  teste: string;
}

const ExpenseDefinitionSchema = new mongoose.Schema(
  {
    form: {
      color: { type: String, required: false },
      name: {
        type: String,
        required: [true, "Forma de pagamento obrigatória"],
      },
    },
    type: {
      color: { type: String, required: false },
      name: { type: String, required: [true, "Tipo de pagamento obrigatório"] },
    },
    source: {
      color: { type: String, required: false },
      name: {
        type: String,
        required: [true, "Fonte de pagamento obrigatório"],
      },
    },
    category: {
      color: { type: String, required: false },
      name: { type: String, required: [true, "Categoria obrigatória"] },
    },
    frequency: {
      color: { type: String, required: false },
      name: { type: String, required: [true, "Categoria obrigatória"] },
      period: { type: Number, required: [true, "Período obrigatório"] },
    },
  },
  { _id: false },
);

const ExpenseInstallmentSchema = new mongoose.Schema(
  {
    current: { type: Number, default: 0 },
    total: { type: Number, required: true, min: [1, "Mínimo de parcelas é 1"] },
  },
  { _id: false },
);

const ExpensePaymentAtSchema = new mongoose.Schema(
  { date: Date, value: Number, paid: Boolean },
  { _id: false },
);

const ExpenseTimelineSchema = new mongoose.Schema(
  {
    lastPaymentAt: Date,
    purchasedAt: Date,
    paymentsAt: [ExpensePaymentAtSchema],
  },
  { _id: false },
);

const ExpensePriceSchema = new mongoose.Schema(
  {
    precision: { type: Number, default: 2 },
    currency: { type: String, default: "BRL" },
    value: Number,
    firstInstallmentAdditionalValue: { type: Number, default: 0 },
  },
  { _id: false },
);

const ExpenseFlags = new mongoose.Schema(
  { isRecurrent: Boolean },
  { _id: false },
);

const ExpenseSchema = new mongoose.Schema<Expense>({
  definition: ExpenseDefinitionSchema,
  installment: ExpenseInstallmentSchema,
  name: { type: String, required: [true, "Nome da Despesa deve ser definido"] },
  timeline: ExpenseTimelineSchema,
  price: ExpensePriceSchema,
  flags: ExpenseFlags,
  karteira: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Karteira",
    required: [true, "Karteira deve ser definida"],
  },
});

export default mongoose.models.Expense ||
  mongoose.model<Expense>("Expense", ExpenseSchema);
