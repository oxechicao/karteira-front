import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { DateTime } from "luxon";
import { Types } from "mongoose";
import { expenseValueDefinitionFabric } from "@modules/expense/__mocks__/mockExpenseValueDefinition";
import { expenseDetailsFabric } from "@modules/expense/__mocks__/mockExpenseDetails";
import { expensePaymentFabric } from "@modules/expense/__mocks__/mockExpensePayment";

export const expenseModelFabric = ({
  karteira = new Types.ObjectId("67c5cae67433ea581834f72f"),
  name = "Despesa",
  purchasedAt = DateTime.fromISO("2023-10-01T00:00:00Z"),
  value = String(145000),
  isFinished = false,
  valueDefinition = expenseValueDefinitionFabric({}),
  details = expenseDetailsFabric({}),
  payment = expensePaymentFabric({}),
}: Partial<ExpenseForm>) => ({
  karteira,
  name,
  purchasedAt,
  value,
  isFinished,
  valueDefinition,
  details,
  payment,
});
