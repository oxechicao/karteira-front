"use server";

import { mapDataToExpenseTemplateModel } from "@modules/expenseTemplates/features/create/mapDataToExpenseTemplateModel";
import {
  fetchByIdExpenseTemplate,
  updateByIdExpenseTemplate,
} from "@modules/expenseTemplates/features/edit/editExpenseTemplateRepository";
import ExpenseTemplateModelForm from "@modules/expenseTemplates/models/ExpenseTemplateModelForm";

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
