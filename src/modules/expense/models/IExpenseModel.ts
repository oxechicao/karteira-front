import { Types } from "mongoose";
import { DateTime } from "luxon";
import { IValueDefinition } from "@modules/expense/models/IValueDefinition";
import { IDetails } from "@modules/expense/models/IDetails";
import { IPayment } from "@modules/expense/models/IPayment";

export interface IExpenseModel {
  templateId: Types.ObjectId;
  karteira: Types.ObjectId;
  name: string;
  purchasedAt: DateTime;
  value: string;
  isFinished: boolean;
  valueDefinition: IValueDefinition;
  details: IDetails;
  payment: IPayment;
}
