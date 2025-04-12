import mongoose from "mongoose";

export const DetailsSchema = new mongoose.Schema(
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
