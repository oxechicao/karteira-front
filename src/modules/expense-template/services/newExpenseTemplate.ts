"use server";

import { ExpenseTemplateModelForm } from "@modules/expense-template/models/ExpenseTemplateModelForm";
import { saveExpenseTemplate } from "@modules/expense-template/repositories/saveExpenseTemplate";
import { mapDataToExpenseTemplateModel } from "@modules/expense-template/mappers/mapDataToExpenseTemplateModel";

export async function newExpenseTemplate(data: ExpenseTemplateModelForm) {
  await saveExpenseTemplate(mapDataToExpenseTemplateModel(data));
}
