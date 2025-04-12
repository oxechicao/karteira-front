import { Types } from "mongoose";
import { IExpenseTemplateModel } from "@modules/expense-template/models/IExpenseTemplateModel";

export interface ExpenseTemplateModelForm extends IExpenseTemplateModel {
  templateId: Types.ObjectId;
}
