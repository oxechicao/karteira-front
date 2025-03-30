import { ExpenseModel } from "@modules/expense/models/ExpenseModel";

export type ExpenseTemplateModel = ExpenseModel & {
  templateName: string;
}