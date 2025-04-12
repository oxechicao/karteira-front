import {
  ExpenseDocument,
  ExpenseModel,
} from "@modules/expense/schemas/ExpenseModel";
import dbConnect from "@lib/mongoose/dbConnect";

export async function fetchExpenseById(
  id: string,
): Promise<ExpenseDocument | null> {
  await dbConnect();
  return ExpenseModel.findById(id).lean<ExpenseDocument>();
}
