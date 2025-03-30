import { ExpenseModel } from "@modules/expense/models/ExpenseModel";
import {
  ExpenseDetailsSchema,
  ExpensePaymentSchema,
  ExpenseValueSchema,
} from "@modules/expense/schemas/Expense";
import mongoose from "mongoose";

export type ExpenseTemplate = {
  templateName: string;
  template: ExpenseModel;
};

export interface ExpenseTemplateDocument
  extends ExpenseTemplate,
    mongoose.Document {}

// copy of ExpenseModel withou _id
const ExpenseTemplateModelSchema = new mongoose.Schema(
  {
    karteira: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Karteira",
      required: [true, "Karteira deve ser definida"],
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
    template: ExpenseTemplateModelSchema,
  },
  { timestamps: true },
);

export default mongoose.models.ExpenseTemplate ||
  mongoose.model<ExpenseTemplateDocument>(
    "ExpenseTemplate",
    ExpenseTemplateSchema,
  );
