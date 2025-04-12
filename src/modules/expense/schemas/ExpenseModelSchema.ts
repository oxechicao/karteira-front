import { IExpenseModel } from "@modules/expense/models/IExpenseModel";

export type ExpenseModelSchema = Omit<IExpenseModel, "value"> & {
  value: number;
};
