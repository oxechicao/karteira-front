import { mapFormExpenseEditing } from "@modules/expense/expense.mapper";
import { fetchExpenseById } from "@modules/expense/features/edit/editExpense.repository";

export const getByIdEditExpense = async (id: string) => {
  const expense = await fetchExpenseById(id);
  return mapFormExpenseEditing(expense);
};
