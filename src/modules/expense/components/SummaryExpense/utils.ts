import { currentMonthStart } from "@common/utils/date";
import { Expense } from "@modules/expense/schemas/Expense";
import { DateTime } from "luxon";

export const keyFormat = "yyyy_MM";
export const getKey = (date: string) =>
  DateTime.fromISO(date).toFormat(keyFormat);

export type valuesSummaryType = {
  key: string;
  value: number;
  isRecurrentOnly: boolean;
};

type mapValuesSummaryType = Record<string, valuesSummaryType>;

export const mapValuesSummary = (
  expenses: readonly Expense[],
): valuesSummaryType[] =>
  Object.values(
    expenses.reduce((acc: mapValuesSummaryType, expense) => {
      expense.timeline.paymentsAt.forEach((payment) => {
        if (DateTime.fromISO(payment.date) < currentMonthStart) return;

        const key = getKey(payment.date);

        if (!acc[key])
          acc[key] = {
            value: 0,
            isRecurrentOnly: expense.flags.isRecurrent,
            key: key,
          };

        acc[key].value += payment.value;
        acc[key].isRecurrentOnly =
          acc[key].isRecurrentOnly && expense.flags.isRecurrent;
      });

      return acc;
    }, {}),
  );
