import { fetchExpenseById } from "@modules/expense/features/edit/editExpense.repository";

export const getExpenseById = async (id: string) => {
  const expense = await fetchExpenseById(id);
  if (!expense) {
    throw new Error("Expense not found");
  }

  return expense;
};
