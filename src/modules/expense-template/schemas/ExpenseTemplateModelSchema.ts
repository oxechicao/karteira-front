import { ITemplateExpenseTemplate } from "@modules/expense-template/models/IExpenseTemplateModel";
import { Types } from "mongoose";

export type ExpenseTemplateModelSchema = {
  _id: string | Types.ObjectId;
  templateName: string;
  template: ITemplateExpenseTemplate;
};
