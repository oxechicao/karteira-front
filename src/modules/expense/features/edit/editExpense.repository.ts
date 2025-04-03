import dbConnect from "@lib/mongoose/dbConnect";
import Expense, { ExpenseDocument } from "@modules/expense/expense.schema";

export const fetchExpenseById = async (id: string) => {
  await dbConnect();
  const expense = await Expense.findById(id).lean<ExpenseDocument>();
  return expense;
};

export const updateExpense = async (id: string, body: any) => {
  const validation = new Expense(body).validate();
  if (validation.error) {
    throw new Error(validation.error.message);
  }

  await dbConnect();
  const result = await Expense.findByIdAndUpdate(id, body);
  return result;
};
