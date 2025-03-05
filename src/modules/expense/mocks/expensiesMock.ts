import {
  ExpenseDefinition,
  ExpenseModel,
} from "@modules/expense/models/ExpenseModel";
import { DateTime } from "luxon";
import { Types } from "mongoose";

export const fabricExpenseDefinition = ({
  color = "#743",
  name = "def",
}: Partial<ExpenseDefinition<any>>) => ({ color, name });

export const fabricExpenses = ({
  name = "Expense",
  price = {
    precision: 2,
    currency: "BRL",
    value: 100,
    firstInstallmentAdditionalValue: 0,
  },
  definition = {
    form: fabricExpenseDefinition({ name: "credit" }),
    type: fabricExpenseDefinition({ name: "installment" }),
    source: fabricExpenseDefinition({ name: "itau" }),
    category: fabricExpenseDefinition({ name: "fastfood" }),
  },
  timeline = {
    lastPaymentAt: DateTime.now(),
    purchasedAt: DateTime.now(),
    paymentsAt: [
      {
        date: DateTime.now(),
        value: 100,
        paid: false,
      },
    ],
  },
  installment = { current: 2, total: 5 },
  karteira = new Types.ObjectId("67c5cae67433ea581834f72f"),
}: Partial<ExpenseModel>) => ({
  name,
  price,
  definition,
  timeline,
  installment,
  karteira,
});

export const expenseMock = fabricExpenses({ name: "Expense" });

export const expensesMock = Array.from({ length: 10 }, (_, i) =>
  fabricExpenses({ name: `Expense ${i}` }),
);
