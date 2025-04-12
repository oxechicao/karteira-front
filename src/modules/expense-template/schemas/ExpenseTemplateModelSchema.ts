import { IExpenseTemplateModel } from "@modules/expense-template/models/IExpenseTemplateModel";

export type ExpenseTemplateModelSchema = {
  templateName: string;
  isAnonymous: boolean;
  template: IExpenseTemplateModel;
};
