import { DateTime } from "luxon";
import { ExpenseDocument } from "@modules/expense/schemas/ExpenseModel";
import { fetchExpenseById } from "@modules/expense/repositories/fetchExpenseById";
import { updateExpenseById } from "@modules/expense/services/updateExpenseById";
import { IPaymentAt } from "@modules/expense/models/IPaymentAt";

export async function payExpense(expenseId: string, dates: DateTime[]) {
  const expense: ExpenseDocument | null = await fetchExpenseById(expenseId);
  if (!expense) {
    throw new Error("Expense not found");
  }

  expense.payment.installments = expense.payment.installments.map(
    (installment: IPaymentAt): IPaymentAt => {
      if (dates.some((date) => date === installment.date)) {
        installment.isPaid = true;
      }

      return installment;
    },
  );

  await updateExpenseById(expenseId, expense.toObject());

  return { message: "Expense paid successfully" };
}
