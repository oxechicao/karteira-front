import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { fetchExpenseById } from "@modules/expense/repositories/fetchExpenseById";

export async function getByIdEditExpense(id: string): Promise<ExpenseForm> {
  const expense = await fetchExpenseById(id);
  return (expense || {}) as ExpenseForm;
}
