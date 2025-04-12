import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { mapExpenseSchema } from "@modules/expense/mappers/mapExpenseSchema";
import { updateExpense } from "@modules/expense/repositories/updateExpense";

export async function updateExpenseById(id: string, body: ExpenseForm) {
  const expense = mapExpenseSchema(body);
  return await updateExpense(id, expense);
}
