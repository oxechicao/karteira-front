import mongoose from "mongoose";
import { KarteiraModelSchema } from "@modules/karteira/schemas/KarteiraModelSchema";

export interface KarteiraDocument
  extends Omit<KarteiraModelSchema, "_id">,
    mongoose.Document {}

const karteiraGuestSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    role: { type: String, required: true },
  },
  { _id: false },
);

const KarteiraSchema = new mongoose.Schema<KarteiraDocument>(
  {
    name: {
      type: String,
      required: [true, "Nome da Carteira deve ser definido"],
    },
    owner: { type: String, required: true },
    guests: [karteiraGuestSchema],
    limit: Number,
    goal: Number,
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const KarteiraModel =
  mongoose.models.Karteira ||
  mongoose.model<KarteiraDocument>("Karteira", KarteiraSchema);
