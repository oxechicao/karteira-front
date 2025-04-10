"use server";
import { getExpenseById } from "@modules/expense/pages/pay/payExpense.repository";
import { DateTime } from "luxon";
import { ExpenseTemplatePaymentAt } from "@modules/expense-template/expenseTemplate.type";
import { updateExpenseById } from "@modules/expense/pages/edit/editExpense.service";

export const payExpense = async (expenseId: string, dates: DateTime[]) => {
  const expense = await getExpenseById(expenseId);
  if (!expense) {
    throw new Error("Expense not found");
  }

  expense.payment.installments = expense.payment.installments.map(
    (installment: ExpenseTemplatePaymentAt): ExpenseTemplatePaymentAt => {
      if (dates.some((date) => date === installment.date)) {
        installment.isPaid = true;
      }

      return installment;
    },
  );

  await updateExpenseById(expenseId, expense);

  return { message: "Expense paid successfully" };
};
