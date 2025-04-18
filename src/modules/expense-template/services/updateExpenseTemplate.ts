"use server";
import { ExpenseTemplateModelForm } from "@modules/expense-template/models/ExpenseTemplateModelForm";
import { mapFormToExpenseTemplateModelSchema } from "@modules/expense-template/mappers/mapFormToExpenseTemplateModelSchema";
import { updateByIdExpenseTemplate } from "@modules/expense-template/repositories/updateByIdExpenseTemplate";

export const updateExpenseTemplate = async (
  id: string,
  body: ExpenseTemplateModelForm,
) => {
  return updateByIdExpenseTemplate(
    id,
    mapFormToExpenseTemplateModelSchema(body),
  );
};
