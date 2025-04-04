"use server";

import dbConnect from "@lib/mongoose/dbConnect";
import ExpenseTemplateSchema from "@modules/expenseTemplate/expenseTemplate.schema";

export const fetchExpenseTemplates = async () => {
  await dbConnect();
  const results = await ExpenseTemplateSchema.find({}).sort({ createdAt: -1 });
  return results;
};
