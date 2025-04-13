import { ExpenseDocument } from "@modules/expense/schemas/ExpenseModel";

import { ExpenseListTable } from "@modules/expense/models/ExpenseListTable";
import { convertToDateTime } from "@common/utils/date";
import { IPaymentAt } from "@modules/expense/models/IPaymentAt";

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
        installments: expense.payment.installments.map(
          (installment: IPaymentAt) => {
            return {
              isPaid: installment.isPaid,
              value: installment.value,
              date: convertToDateTime(installment.date),
            };
          },
        ),
        currentInstallment: expense.payment.currentInstallment,
        totalInstallments: expense.payment.totalInstallments,
        payday: expense.payment.payday,
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
