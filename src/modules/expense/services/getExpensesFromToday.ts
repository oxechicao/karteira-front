"use server";

import { fetchExpensesFromToday } from "@modules/expense/repositories/fetchExpensesFromToday";
import { mapExpenseToList } from "@modules/expense/mappers/mapExpenseToList";
import { ExpenseListTable } from "@modules/expense/models/ExpenseListTable";

export async function getExpensesFromToday(): Promise<ExpenseListTable[]> {
  const expenses = await fetchExpensesFromToday();
  return mapExpenseToList(expenses);
}
