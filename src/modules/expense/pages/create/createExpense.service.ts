import insertExpense from "@modules/expense/pages/create/createExpense.repository";
import { mapExpenseSchema } from "@modules/expense/expense.mapper";
import { ExpenseModelForm } from "@modules/expense/expense.type";
import { ExpenseTemplateModelForm } from "@modules/expense-template/expenseTemplate.type";
import { newExpenseTemplate } from "@modules/expense-template/features/create/createExpenseTemplate.service";

async function saveExpenseTemplateFromExpense(data: ExpenseModelForm) {
  const expenseTemplate = {
    ...data,
    templateName: data.templateName || "",
    isAnonymous: false,
  } as ExpenseTemplateModelForm;

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
