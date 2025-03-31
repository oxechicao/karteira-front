import ExpenseTemplateForm from "../models/ExpenseTemplateForm";
import ExpenseDetailsSchema from "@modules/expenseTemplates/schemas/ExpenseDetailsSchema";
import ExpensePaymentSchema from "@modules/expenseTemplates/schemas/ExpensePaymentSchema";
import ExpenseValueSchema from "@modules/expenseTemplates/schemas/ExpenseValueSchema";
import mongoose from "mongoose";

export type ExpenseTemplateSchemaModel = {
  templateName: string;
  isAnonymous: boolean;
  template: ExpenseTemplateForm;
};

export interface ExpenseTemplateDocument
  extends ExpenseTemplateSchemaModel,
    mongoose.Document {}

// copy of ExpenseModel without _id
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
