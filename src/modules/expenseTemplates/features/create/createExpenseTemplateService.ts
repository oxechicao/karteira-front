import { saveExpenseTemplate } from "@modules/expenseTemplates/features/create/createExpenseTemplateRepository";
import { mapDataToExpenseTemplateModel } from "@modules/expenseTemplates/features/create/mapDataToExpenseTemplateModel";
import ExpenseTemplateModelForm from "@modules/expenseTemplates/models/ExpenseTemplateModelForm";

export const newExpenseTemplate = async (data: ExpenseTemplateModelForm) => {
  const result = await saveExpenseTemplate(mapDataToExpenseTemplateModel(data));
  return result;
};
