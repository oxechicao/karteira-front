import { ExpenseTemplateModelForm } from "@modules/expenseTemplate/expenseTemplate.type";
import { saveExpenseTemplate } from "@modules/expenseTemplate/features/create/createExpenseTemplate.repository";
import { mapDataToExpenseTemplateModel } from "@modules/expenseTemplate/expenseTemplate.mapper";

export const newExpenseTemplate = async (data: ExpenseTemplateModelForm) => {
  const result = await saveExpenseTemplate(mapDataToExpenseTemplateModel(data));
  return result;
};
