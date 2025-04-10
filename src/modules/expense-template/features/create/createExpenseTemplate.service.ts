import { ExpenseTemplateModelForm } from "@modules/expense-template/expenseTemplate.type";
import { saveExpenseTemplate } from "@modules/expense-template/features/create/createExpenseTemplate.repository";
import { mapDataToExpenseTemplateModel } from "@modules/expense-template/expenseTemplate.mapper";

export const newExpenseTemplate = async (data: ExpenseTemplateModelForm) => {
  const result = await saveExpenseTemplate(mapDataToExpenseTemplateModel(data));
  return result;
};
