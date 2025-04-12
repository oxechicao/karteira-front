import { Types } from "mongoose";
import { IExpenseTemplateModel } from "@modules/expense-template/models/IExpenseTemplateModel";

export type ExpenseTemplateModelForm = IExpenseTemplateModel & {
  templateName: string;
  templateId: Types.ObjectId;
};
