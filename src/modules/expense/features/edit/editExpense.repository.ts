import dbConnect from "@lib/mongoose/dbConnect";
import { ExpenseModel, ExpenseDocument } from "@modules/expense/expense.schema";

export const fetchExpenseById = async (
  id: string,
): Promise<ExpenseDocument | null> => {
  await dbConnect();
  return ExpenseModel.findById(id).lean<ExpenseDocument>();
};

export const updateExpense = async (id: string, body: any) => {
  const validation = new ExpenseModel(body).validate();
  if (validation.error) {
    throw new Error(validation.error.message);
  }
  console.log(body);
  await dbConnect();
  return ExpenseModel.findByIdAndUpdate(id, body);
};
