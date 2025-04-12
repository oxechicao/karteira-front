import { ExpenseDocument } from "@modules/expense/schemas/ExpenseModel";

import { ExpenseListTable } from "@modules/expense/models/ExpenseListTable";

export const mapExpenseToList = (
  expenses: ExpenseDocument[],
): ExpenseListTable[] => {
  return expenses.map(
    (expense: ExpenseDocument): ExpenseListTable => ({
      _id: expense._id as string,
      name: expense.name,
      value: String(expense.value),
      purchasedAt: expense.purchasedAt,
      payment: {
        currentInstallment: expense.payment.currentInstallment,
        totalInstallments: expense.payment.totalInstallments,
      },
      details: {
        category: expense.details.category,
        source: expense.details.source,
        form: expense.details.form,
        type: expense.details.type,
      },
    }),
  );
};
