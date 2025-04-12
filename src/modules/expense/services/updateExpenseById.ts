import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { mapFormExpenseToExpenseSchema } from "@modules/expense/mappers/mapFormExpenseToExpenseSchema";
import { updateExpense } from "@modules/expense/repositories/updateExpense";

export async function updateExpenseById(id: string, body: ExpenseForm) {
  const expense = mapFormExpenseToExpenseSchema(body);
  return await updateExpense(id, expense);
}
