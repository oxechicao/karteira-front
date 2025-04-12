"use server";

import { fetchExpenseTemplates } from "@modules/expense-template/repositories/fetchExpenseTemplates";
import { ExpenseTemplateModelSchema } from "@modules/expense-template/schemas/ExpenseTemplateModelSchema";

export async function getExpensesTemplates(): Promise<ExpenseTemplateModelSchema> {
  return fetchExpenseTemplates();
}
