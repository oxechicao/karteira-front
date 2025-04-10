import { fetchExpenseById } from "@modules/expense/pages/edit/editExpense.repository";
import { updateExpenseById } from "@modules/expense/pages/edit/editExpense.service";

export const getExpenseById = async (id: string) => {
  const expense = await fetchExpenseById(id);
  if (!expense) {
    throw new Error("Expense not found");
  }

  return expense;
};

export const savePayments = async (id, expense) => {
  const result = await updateExpenseById(id, expense);
  return result;
};
