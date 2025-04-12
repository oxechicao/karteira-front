"use server";

import dbConnect from "@lib/mongoose/dbConnect";
import { ExpenseTemplateModel } from "@modules/expense-template/schemas/ExpenseTemplateModel";

export async function deleteByIdExpenseTemplate(id: string) {
  await dbConnect();
  return ExpenseTemplateModel.findByIdAndDelete(id);
}
