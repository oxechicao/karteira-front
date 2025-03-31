import {
  mapExpenseSchema,
  mapFormExpenseEditing,
} from "@modules/expense/expense.mapper";
import { ExpenseDocument } from "@modules/expense/expense.schema";
import { ExpenseModelForm } from "@modules/expense/expense.type";
import {
  fetchExpenseById,
  updateExpense,
} from "@modules/expense/features/edit/editExpense.repository";

export const getByIdEditExpense = async (id: string) => {
  const expense = await fetchExpenseById(id);
  return mapFormExpenseEditing(expense as unknown as ExpenseDocument);
};

export const updateExpenseById = async (id: string, body: ExpenseModelForm) => {
  const expense = mapExpenseSchema(body);
  return await updateExpense(id, expense);
};
