"use server";

import { mapExpenseToList } from "@modules/expense/expense.mapper";
import Expense from "@modules/expense/expense.schema";
import { DateTime } from "luxon";

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
