"use server";

import dbConnect from "@lib/mongoose/dbConnect";
import Expense, {
  ExpenseModelSchema,
} from "@modules/expense/schemas/ExpenseSchema";

export default async function insertExpense(payload: ExpenseModelSchema) {
  const expense = new Expense(payload);
  const validation = expense.validateSync();
  if (validation?.errors?.length > 0) {
    throw new Error("Validation error", validation.errors);
  }

  await dbConnect();
  return expense.save();
}
