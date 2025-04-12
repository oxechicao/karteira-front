"use server";

import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { ExpenseTemplateModelForm } from "@modules/expense-template/models/ExpenseTemplateModelForm";
import { mapExpenseSchema } from "@modules/expense/mappers/mapExpenseSchema";
import { insertExpense } from "@modules/expense/repositories/insertExpense";
import { newExpenseTemplate } from "@modules/expense-template/services/newExpenseTemplate";

async function saveExpenseTemplateFromExpense(data: ExpenseForm) {
  const expenseTemplate = {
    ...data,
    templateName: data.templateName || "",
    isAnonymous: false,
  } as ExpenseTemplateModelForm;

  return newExpenseTemplate(expenseTemplate);
}

export async function saveExpense(data: ExpenseForm) {
  const expense = mapExpenseSchema(data);
  if (data.shouldCreateNewTemplate) {
    return Promise.all([
      saveExpenseTemplateFromExpense(data),
      insertExpense(expense),
    ]);
  }

  return insertExpense(expense);
}
