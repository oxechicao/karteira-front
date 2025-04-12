"use server";

import dbConnect from "@lib/mongoose/dbConnect";
import { ExpenseTemplateModel } from "@modules/expense-template/schemas/ExpenseTemplateModel";

export async function fetchExpenseTemplates() {
  await dbConnect();
  return ExpenseTemplateModel.find({}).sort({ createdAt: -1 });
}
