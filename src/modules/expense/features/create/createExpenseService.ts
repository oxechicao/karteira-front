import insertExpense from "@modules/expense/features/create/createExpenseRepository";
import mapExpenseSchema from "@modules/expense/helpers/mapExpenseFormModel";
import ExpenseModelForm from "@modules/expense/models/ExpenseModelForm";
import { newExpenseTemplate } from "@modules/expenseTemplates/features/create/createExpenseTemplateService";
import ExpenseTemplateModelForm from "@modules/expenseTemplates/models/ExpenseTemplateModelForm";

async function saveExpenseTemplateFromExpense(data: ExpenseModelForm) {
  const expenseTemplate: ExpenseTemplateModelForm = {
    ...data,
    templateName: data.templateName,
    isAnonymous: false,
  };

  await newExpenseTemplate(expenseTemplate);
}

export default async function saveExpense(data: ExpenseModelForm) {
  if (data.shouldCreateNewTemplate) {
    saveExpenseTemplateFromExpense(data);
  }

  const expense = mapExpenseSchema(data);
  const result = await insertExpense(expense);
  return result;
}
