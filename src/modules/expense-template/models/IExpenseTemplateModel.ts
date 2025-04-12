import { Types } from "mongoose";
import { DateTime } from "luxon";
import { IValueDefinition } from "@modules/expense/models/IValueDefinition";
import { IDetails } from "@modules/expense/models/IDetails";
import { IPayment } from "@modules/expense/models/IPayment";
import { IExpenseModel } from "@modules/expense/models/IExpenseModel";

interface ITemplateExpenseTemplate
  extends Omit<IExpenseModel, "templateId" | "isFinished"> {}

export interface IExpenseTemplateModel {
  templateName: string;
  template: ITemplateExpenseTemplate;
}
