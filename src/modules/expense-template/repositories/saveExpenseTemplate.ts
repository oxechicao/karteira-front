"use server";

import { ExpenseTemplateModel } from "@modules/expense-template/schemas/ExpenseTemplateModel";
import dbConnect from "@lib/mongoose/dbConnect";
import { ExpenseTemplateModelSchema } from "@modules/expense-template/schemas/ExpenseTemplateModelSchema";

export const saveExpenseTemplate = async (data: ExpenseTemplateModelSchema) => {
  const expenseTemplate = new ExpenseTemplateModel(data);
  const validate = await expenseTemplate.validate();

  if (validate?.errors?.length > 0) {
    throw new Error("Validation error", validate.errors);
  }

  await dbConnect();
  await expenseTemplate.save();

  return expenseTemplate;
};
