"use server";

import dbConnect from "@lib/mongoose/dbConnect";
import { ExpenseTemplateModel } from "@modules/expense-template/schemas/ExpenseTemplateModel";
import { ExpenseTemplateModelSchema } from "@modules/expense-template/schemas/ExpenseTemplateModelSchema";

export async function fetchExpenseTemplates() {
  await dbConnect();
  return ExpenseTemplateModel.find({})
    .sort({ templateName: 1 })
    .lean<ExpenseTemplateModelSchema>();
}
