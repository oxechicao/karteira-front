"use server";

import Expense from "@modules/expense/schemas/Expense";
import { ExpenseModel } from "@modules/expense/models/ExpenseModel";
import { mapPayload } from "@modules/expense/utils/mapPayload";
import { DateTime } from "luxon";

export async function saveExpense(payload: ExpenseModel) {
  const expense = new Expense(mapPayload(payload));
  const validation = expense.validateSync();
  if (validation?.errors?.length > 0) {
    throw new Error("Validation error", validation.errors);
  }

  console.log(expense.timeline.paymentsAt);
  // return expense.save();
}

export async function getExpensesFromToday() {
  const startOfMonth = DateTime.fromObject({
    day: 1,
    month: DateTime.now().month,
    year: DateTime.now().year,
  }).toJSDate();

  const expenses = await Expense.find({
    $or: [
      { "flags.isRecurrent": true },
      { "timeline.paymentsAt.date": { $gte: startOfMonth } },
    ],
  });

  return expenses;
}
