import { ExpenseModel } from "@modules/expense/schemas/ExpenseModel";
import dbConnect from "@lib/mongoose/dbConnect";
import { ExpenseModelSchema } from "@modules/expense/schemas/ExpenseModelSchema";

export async function insertExpense(payload: ExpenseModelSchema) {
  const expense = new ExpenseModel(payload);
  const validation = expense.validateSync();
  if (validation?.errors?.length > 0) {
    throw new Error("Validation error", validation.errors);
  }

  await dbConnect();
  return expense.save();
}
