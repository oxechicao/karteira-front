import mongoose from "mongoose";

import { PaymentAtSchema } from "@modules/expense/schemas/PaymentAtSchema";

export const PaymentSchema = paymentSchemaBuilder();

export function paymentSchemaBuilder(required: boolean = true) {
  return new mongoose.Schema(
    {
      installments: [PaymentAtSchema],
      totalInstallments: {
        type: Number,
        default: 1,
        min: [1, "Mínimo de parcelas é 1"],
        required,
      },
      currentInstallment: { type: Number, default: 0, required },
      frequency: String,
      frequencyPeriod: Number,
      isRecurrent: { type: Boolean, default: false },
      payday: { type: Number, required, default: 0 },
    },
    { _id: false },
  );
}
