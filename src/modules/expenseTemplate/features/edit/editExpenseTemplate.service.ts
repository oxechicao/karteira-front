"use server";

import { ExpenseTemplateModelForm } from "@modules/expenseTemplate/expenseTemplate.type";
import { mapDataToExpenseTemplateModel } from "@modules/expenseTemplate/expenseTemplate.mapper";
import {
  fetchByIdExpenseTemplate,
  updateByIdExpenseTemplate,
} from "@modules/expenseTemplate/features/edit/editExpenseTemplate.repository";

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
