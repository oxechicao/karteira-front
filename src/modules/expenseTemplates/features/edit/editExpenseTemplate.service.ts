"use server";

import { ExpenseTemplateModelForm } from "@modules/expenseTemplates/expenseTemplate.type";
import { mapDataToExpenseTemplateModel } from "@modules/expenseTemplates/expenseTemplate.mapper";
import {
  fetchByIdExpenseTemplate,
  updateByIdExpenseTemplate,
} from "@modules/expenseTemplates/features/edit/editExpenseTemplate.repository";

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
