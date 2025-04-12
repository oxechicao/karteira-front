import mongoose from "mongoose";
import { ExpenseTemplateModelSchema } from "@modules/expense-template/schemas/ExpenseTemplateModelSchema";
import { TemplateSchema } from "@modules/expense-template/schemas/TemplateSchema";

export interface ExpenseTemplateDocument
  extends Omit<ExpenseTemplateModelSchema, "_id">,
    mongoose.Document {}

const ExpenseTemplateSchema = new mongoose.Schema<ExpenseTemplateDocument>(
  {
    templateName: { type: String, required: true },
    template: TemplateSchema,
  },
  { timestamps: true },
);

export const ExpenseTemplateModel =
  mongoose.models?.ExpenseTemplate ||
  mongoose.model<ExpenseTemplateDocument>(
    "ExpenseTemplate",
    ExpenseTemplateSchema,
  );
