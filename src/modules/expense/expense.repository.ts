"use server";

import Expense, {
  ExpenseDocument,
  ExpenseModel,
  ExpenseModelSchema,
} from "@modules/expense/expense.schema";
import dbConnect from "@lib/mongoose/dbConnect";
import { DateTime } from "luxon";
import { mapExpenseToList } from "@modules/expense/expense.mapper";

export async function fetchExpenseById(
  id: string,
): Promise<ExpenseDocument | null> {
  await dbConnect();
  return ExpenseModel.findById(id).lean<ExpenseDocument>();
}

export async function updateExpense(id: string, body: any) {
  const validation = new ExpenseModel(body).validate();
  if (validation.error) {
    throw new Error(validation.error.message);
  }
  console.log(body);
  await dbConnect();
  return ExpenseModel.findByIdAndUpdate(id, body);
}

export async function insertExpense(payload: ExpenseModelSchema) {
  const expense = new Expense(payload);
  const validation = expense.validateSync();
  if (validation?.errors?.length > 0) {
    throw new Error("Validation error", validation.errors);
  }

  await dbConnect();
  return expense.save();
}

export async function getExpensesFromToday() {
  const startOfMonth = DateTime.fromObject({
    day: 1,
    month: DateTime.now().month,
    year: DateTime.now().year,
  }).toJSDate();

  const expenses = await Expense.find({
    $or: [
      { "payment.isRecurrent": true },
      { "payment.installments.date": { $gte: startOfMonth } },
    ],
  });

  return mapExpenseToList(expenses);
}
