"use server";

import { ExpenseTemplateModelForm } from "@modules/expense-template/models/ExpenseTemplateModelForm";
import { saveExpenseTemplate } from "@modules/expense-template/repositories/saveExpenseTemplate";
import { mapFormToExpenseTemplateModelSchema } from "@modules/expense-template/mappers/mapFormToExpenseTemplateModelSchema";

export async function newExpenseTemplate(data: ExpenseTemplateModelForm) {
  await saveExpenseTemplate(mapFormToExpenseTemplateModelSchema(data));
}
