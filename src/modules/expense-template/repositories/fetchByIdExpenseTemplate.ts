"use server";

import dbConnect from "@lib/mongoose/dbConnect";
import { ExpenseTemplateModel } from "@modules/expense-template/schemas/ExpenseTemplateModel";

export async function fetchByIdExpenseTemplate(id: string) {
  await dbConnect();
  return ExpenseTemplateModel.findById(id).populate("template");
}
