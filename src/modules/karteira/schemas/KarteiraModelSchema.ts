import { IKarteiraModel } from "@modules/karteira/models/IKarteiraModel";
import { Types } from "mongoose";

export type KarteiraModelSchema = IKarteiraModel & { _id?: Types.ObjectId };
