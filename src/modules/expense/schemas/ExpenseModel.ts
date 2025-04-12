import mongoose from "mongoose";
import { ValueSchema } from "@modules/expense/schemas/ValueSchema";
import { DetailsSchema } from "@modules/expense/schemas/DetailsSchema";
import { PaymentSchema } from "@modules/expense/schemas/PaymentSchema";
import { ExpenseModelSchema } from "@modules/expense/schemas/ExpenseModelSchema";

export interface ExpenseDocument
  extends ExpenseModelSchema,
    mongoose.Document {}

const ExpenseSchema = new mongoose.Schema<ExpenseDocument>(
  {
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExpenseTemplate",
      required: [true, "Template deve ser definido"],
    },
    karteira: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Karteira",
      required: [true, "Karteira deve ser definida"],
    },
    name: { type: String, required: true, default: "" },
    purchasedAt: { type: Date, required: true },
    value: { type: Number, required: true, default: 0 },
    isFinished: { type: Boolean, required: true, default: false },
    valueDefinition: ValueSchema,
    details: DetailsSchema,
    payment: PaymentSchema,
  },
  {
    timestamps: true,
  },
);

export const ExpenseModel =
  mongoose.models?.Expense ||
  mongoose.model<ExpenseDocument>("Expense", ExpenseSchema);
