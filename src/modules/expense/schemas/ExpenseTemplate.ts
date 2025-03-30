import { ExpenseModel } from "@modules/expense/models/ExpenseModel";
import { ExpenseDetailsSchema, ExpensePaymentSchema, ExpenseValueSchema } from "@modules/expense/schemas/Expense";
import mongoose from "mongoose";

export interface ExpenseTemplate extends mongoose.Document {
  templateName: string;
  template: ExpenseModel;
}

// copy of ExpenseModel withou _id
const ExpenseTemplateModelSchema = new mongoose.Schema(
  {
  karteira: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Karteira",
    required: [true, "Karteira deve ser definida"],
  },
  name: { type: String },
  purchasedAt: { type: Date },
  value: { type: Number },
  isFinished: { type: Boolean, default: false },
  dueDate: { type: Date },
  valueDefinition: ExpenseValueSchema,
  details: ExpenseDetailsSchema,
  payment: ExpensePaymentSchema,
}, { _id: false });

const ExpenseTemplateSchema = new mongoose.Schema<ExpenseTemplate>({
  templateName: { type: String, required: true },
  template: ExpenseTemplateModelSchema,
});

export default mongoose.models.Expense ||
  mongoose.model<ExpenseTemplate>("ExpenseTemplate", ExpenseTemplateSchema);