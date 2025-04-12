"use server";

import { ExpenseModel } from "@modules/expense/schemas/ExpenseModel";
import dbConnect from "@lib/mongoose/dbConnect";
import { DateTime } from "luxon";

export async function fetchExpensesFromToday() {
  const startOfMonth = DateTime.fromObject({
    day: 1,
    month: DateTime.now().month,
    year: DateTime.now().year,
  }).toJSDate();

  await dbConnect();
  return ExpenseModel.find({
    $or: [
      { "payment.isRecurrent": true },
      { "payment.installments.date": { $gte: startOfMonth } },
    ],
  });
}
