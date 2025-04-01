"use server";

import dbConnect from "@lib/mongoose/dbConnect";
import ExpenseTemplateSchema from "@modules/expenseTemplate/expenseTemplate.schema";

export async function deleteByIdExpenseTemplate(id: string) {
  await dbConnect();
  const result = await ExpenseTemplateSchema.findByIdAndDelete(id);
  return result;
}
