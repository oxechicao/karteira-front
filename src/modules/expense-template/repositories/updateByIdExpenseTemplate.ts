"use server";

import dbConnect from "@lib/mongoose/dbConnect";
import { ExpenseTemplateModelSchema } from "@modules/expense-template/schemas/ExpenseTemplateModelSchema";
import { ExpenseTemplateModel } from "@modules/expense-template/schemas/ExpenseTemplateModel";

export async function updateByIdExpenseTemplate(
  id: string,
  data: ExpenseTemplateModelSchema,
) {
  const expenseTemplate = new ExpenseTemplateModel(data);
  const validate = await expenseTemplate.validate();
  if (validate?.errors?.length > 0) {
    throw new Error("Validation error", validate.errors);
  }

  await dbConnect();
  return ExpenseTemplateModel.findByIdAndUpdate(id, data);
}
