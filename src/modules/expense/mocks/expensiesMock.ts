import { ExpenseDefinition, ExpenseModel } from "@modules/expense/models/ExpenseModel";
import { DateTime } from "luxon";

export const fabricExpenseDefinition = ({ color = '#743', name = 'def' }: Partial<ExpenseDefinition>) => ({ color, name })

export const fabricExpenses = ({
  name = 'Expense',
  value = {
    precision: 2,
    currency: 'BRL',
    value: 0,
    firstInstallmentAdditionalValue: 0,
  },
  definition = {
    form: fabricExpenseDefinition({}),
    type: fabricExpenseDefinition({}),
    source: fabricExpenseDefinition({}),
    category: fabricExpenseDefinition({}),
  },
  timeline = {
    lastPaymentAt: DateTime.now(),
    purchasedAt: DateTime.now(),
    paymentsAt: [DateTime.now()],
  },
  installment = { current: 0, total: 1 },
}: Partial<ExpenseModel>) => ({
  name,
  value,
  definition,
  timeline,
  installment,
});

export const expenseMock = fabricExpenses({ name: 'Expense' });

export const expensesMock = Array.from({ length: 10 }, (_, i) => fabricExpenses({ name: `Expense ${i}` }));