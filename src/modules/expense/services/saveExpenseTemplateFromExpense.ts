"use server";

import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { mapExpenseSchema } from "@modules/expense/mappers/mapExpenseSchema";
import { insertExpense } from "@modules/expense/repositories/insertExpense";
import { newExpenseTemplate } from "@modules/expense-template/services/newExpenseTemplate";
import { mapExpenseToExpenseTemplate } from "@modules/expense/mappers/mapExpenseToExpenseTemplate";

async function saveExpenseTemplateFromExpense(data: ExpenseForm) {
  await newExpenseTemplate(mapExpenseToExpenseTemplate(data));
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
