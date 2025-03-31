import dbConnect from "@lib/mongoose/dbConnect";
import Expense from "@modules/expense/expense.schema";

export const fetchExpenseById = async (id: string) => {
  await dbConnect();
  const expense = await Expense.findById(id).lean();
  return expense;
};
