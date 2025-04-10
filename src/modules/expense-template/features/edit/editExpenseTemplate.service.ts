"use server";

import { ExpenseTemplateModelForm } from "@modules/expense-template/expenseTemplate.type";
import { mapDataToExpenseTemplateModel } from "@modules/expense-template/expenseTemplate.mapper";
import {
  fetchByIdExpenseTemplate,
  updateByIdExpenseTemplate,
} from "@modules/expense-template/features/edit/editExpenseTemplate.repository";

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
  const result = await updateByIdExpenseTemplate(
    id,
    mapDataToExpenseTemplateModel(body),
  );

  return result;
};
