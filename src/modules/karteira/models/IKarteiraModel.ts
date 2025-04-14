import { Types } from "mongoose";
import { IGuestModel } from "@modules/karteira/models/IGuestModel";

export interface IKarteiraModel {
  _id?: Types.ObjectId;
  name: string;
  owner: string;
  guests: IGuestModel[] | [];
  goal: string;
  limit: string;
  createdAt?: Date;
  updatedAt?: Date;
}
