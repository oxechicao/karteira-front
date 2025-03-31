"use server";

import Expense from "@modules/expense/schemas/ExpenseSchema";
import { DateTime } from "luxon";

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
