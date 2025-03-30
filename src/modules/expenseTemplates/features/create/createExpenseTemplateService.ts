import { saveExpenseTemplate } from "@modules/expenseTemplates/features/create/createExpenseTemplateRepository";
import { mapDataToExpenseTemplateModel } from "@modules/expenseTemplates/features/create/mapDataToExpenseTemplateModel";
import { ExpenseTemplateModel } from "@modules/expenseTemplates/models/ExpenseTemplateModel";

export const newExpenseTemplate = async (data: ExpenseTemplateModel) => {
  const result = await saveExpenseTemplate(mapDataToExpenseTemplateModel(data));
  return result;
};
