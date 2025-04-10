"use server";
import { ExpenseTemplateModelForm } from "@modules/expense-template/expense-template.type";
import { mapDataToExpenseTemplateModel } from "@modules/expense-template/expense-template.mapper";
import {
  deleteByIdExpenseTemplate,
  fetchByIdExpenseTemplate,
  fetchExpenseTemplates,
  saveExpenseTemplate,
  updateByIdExpenseTemplate,
} from "@modules/expense-template/expense-template.repository";

export async function newExpenseTemplate(data: ExpenseTemplateModelForm) {
  return saveExpenseTemplate(mapDataToExpenseTemplateModel(data));
}

export async function deleteExpenseTemplate(id: string) {
  return await deleteByIdExpenseTemplate(id);
}

export const getByIdEditExpenseTemplate = async (id: string) => {
  const result = await fetchByIdExpenseTemplate(id);
  const template = result.template._doc;
  return {
    templateName: result?.templateName,
    ...template,
  };
};
export const updateExpenseTemplate = async (
  id: string,
  body: ExpenseTemplateModelForm,
) => {
  return updateByIdExpenseTemplate(id, mapDataToExpenseTemplateModel(body));
};
export const getExpensesTemplates = async () => {
  return fetchExpenseTemplates();
};
