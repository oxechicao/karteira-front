"use server";
import { ExpenseTemplateModelForm } from "@modules/expense-template/models/ExpenseTemplateModelForm";
import { mapDataToExpenseTemplateModel } from "@modules/expense-template/mappers/mapDataToExpenseTemplateModel";
import { updateByIdExpenseTemplate } from "@modules/expense-template/repositories/updateByIdExpenseTemplate";
import { fetchExpenseTemplates } from "@modules/expense-template/repositories/fetchExpenseTemplates";

export const updateExpenseTemplate = async (
  id: string,
  body: ExpenseTemplateModelForm,
) => {
  return updateByIdExpenseTemplate(id, mapDataToExpenseTemplateModel(body));
};
export const getExpensesTemplates = async () => {
  return fetchExpenseTemplates();
};
