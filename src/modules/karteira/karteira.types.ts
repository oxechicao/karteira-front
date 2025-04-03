import { Types } from "mongoose";

export type GuestModel = {
  email: string;
  role: string;
}

export type KarteiraListItem = {
  _id: Types.ObjectId;
  name: string;
  owner: string;
  guests: GuestModel[] | [];
  createdAt?: Date;
  updatedAt?: Date;
}

export type KarteiraList = KarteiraListItem[];

export type KarteiraModel = {
  name: string;
  owner: string;
  guests: GuestModel[];
  createdAt?: Date;
  updatedAt?: Date;
}
