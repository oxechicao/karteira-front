import { KarteiraModel } from "@modules/karteira/karteira.types";
import mongoose, { Types } from "mongoose";

export type KarteiraSchemaModel = KarteiraModel & { _id?: Types.ObjectId};

export interface KarteiraDocument
  extends Omit<KarteiraSchemaModel, '_id'>,
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
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Karteira ||
  mongoose.model<KarteiraDocument>("karteira", KarteiraSchema);
