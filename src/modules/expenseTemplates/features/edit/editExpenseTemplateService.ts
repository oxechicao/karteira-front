"use server";

import { mapDataToExpenseTemplateModel } from "@modules/expenseTemplates/features/create/mapDataToExpenseTemplateModel";
import {
  fetchByIdExpenseTemplate,
  updateByIdExpenseTemplate,
} from "@modules/expenseTemplates/features/edit/editExpenseTemplateRepository";
import { ExpenseTemplateModel } from "@modules/expenseTemplates/models/ExpenseTemplateModel";

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
  body: ExpenseTemplateModel,
) => {
  const result = await updateByIdExpenseTemplate(
    id,
    mapDataToExpenseTemplateModel(body),
  );

  return result;
};
