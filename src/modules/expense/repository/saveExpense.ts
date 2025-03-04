import Expense, { ExpenseEntity } from "@modules/expense/models/Expense";

export default async function saveExpense(payload: ExpenseEntity) {
  return Expense.create(payload);
}