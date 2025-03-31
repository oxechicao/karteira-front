import { ExpenseTemplateModelForm } from "@modules/expenseTemplates/expenseTemplate.type";
import { saveExpenseTemplate } from "@modules/expenseTemplates/features/create/createExpenseTemplate.repository";
import { mapDataToExpenseTemplateModel } from "@modules/expenseTemplates/expenseTemplate.mapper";

export const newExpenseTemplate = async (data: ExpenseTemplateModelForm) => {
  const result = await saveExpenseTemplate(mapDataToExpenseTemplateModel(data));
  return result;
};
