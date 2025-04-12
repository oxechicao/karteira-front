import mongoose from "mongoose";
import { ValueSchema } from "@modules/expense/schemas/ValueSchema";
import { DetailsSchema } from "@modules/expense/schemas/DetailsSchema";
import { paymentSchemaBuilder } from "@modules/expense/schemas/PaymentSchema";

export const TemplateSchema = new mongoose.Schema(
  {
    karteira: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Karteira",
      required: [true, "KarteiraSchema deve ser definida"],
    },
    name: { type: String, required: false, default: "" },
    purchasedAt: { type: Date, required: false, default: Date.now },
    value: { type: Number, required: false, default: 0 },
    valueDefinition: ValueSchema,
    details: DetailsSchema,
    payment: paymentSchemaBuilder(false),
  },
  { _id: false },
);
