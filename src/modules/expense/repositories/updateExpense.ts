import { ExpenseModel } from "@modules/expense/schemas/ExpenseModel";
import dbConnect from "@lib/mongoose/dbConnect";
import { ExpenseModelSchema } from "@modules/expense/schemas/ExpenseModelSchema";

export async function updateExpense(id: string, body: ExpenseModelSchema) {
  const validation = new ExpenseModel(body).validate();
  if (validation.error) {
    throw new Error(validation.error.message);
  }

  await dbConnect();
  return ExpenseModel.findByIdAndUpdate(id, body);
}
