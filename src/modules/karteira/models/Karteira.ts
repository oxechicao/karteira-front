import { KarteiraModel } from "@modules/karteira/models/KarteiraModel";
import mongoose from "mongoose";

export interface Karteira extends KarteiraModel, mongoose.Document { }

const KarteiraSchema = new mongoose.Schema<Karteira>({
  name: { type: String, required: [true, "Nome da Carteira deve ser definido"] },
  owner: { type: String, required: true },
  guests: { type: [Object], required: false },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
})

export default mongoose.models.Karteira || mongoose.model<Karteira>("karteira", KarteiraSchema);