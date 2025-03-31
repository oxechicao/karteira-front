"use server";

import Expense from "@modules/expense/expense.schema";
import { DateTime } from "luxon";

export default async function getExpensesFromToday() {
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

  return expenses;
}
