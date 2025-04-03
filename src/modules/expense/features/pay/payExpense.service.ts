import { getExpenseById } from "@modules/expense/features/pay/payExpense.repository";
import { DateTime } from "luxon";

export const payExpense = async (expenseId: string) => {
  const expense = await getExpenseById(expenseId);
  if (!expense) {
    throw new Error("Expense not found");
  }

  const currentDate = DateTime.now();

  return { message: "Expense paid successfully" };
};
