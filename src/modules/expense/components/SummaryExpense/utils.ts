import { currentMonthStart } from "@common/utils/date";
import { Expense } from "@modules/expense/models/Expense";
import { DateTime } from "luxon";

export const keyFormat = "yyyy_MM";
export const getKey = (date: string) =>
  DateTime.fromISO(date).toFormat(keyFormat);
type mapValuesSummaryType = {
  recurrent: number;
  byMonth: Record<string, number>;
};
export const mapValuesSummary = (
  expenses: readonly Expense[],
): mapValuesSummaryType =>
  expenses.reduce(
    (acc: mapValuesSummaryType, expense) => {
      if (expense.flags.isRecurrent) {
        acc.recurrent += expense.price.value;
      }

      expense.timeline.paymentsAt.forEach((payment) => {
        if (DateTime.fromISO(payment.date) < currentMonthStart) return;

        const key = getKey(payment.date);

        if (!acc.byMonth[key]) acc.byMonth[key] = 0;

        acc.byMonth[key] += payment.value;
      });

      return acc;
    },
    { recurrent: 0, byMonth: {} },
  );

export type valuesSummaryType = {
  key: string;
  value: number;
  isRecurrentOnly: boolean;
};

export const mapValuesSummaryByMonthWithRecurrent = (
  values: mapValuesSummaryType,
): valuesSummaryType[] => {
  const { byMonth, recurrent } = values;

  const ammountByMonth = Object.keys(byMonth).length;
  const hasMoreThanEqualOneYear = ammountByMonth >= 12;

  const valuesByMonth: { [key: string]: valuesSummaryType } = Array.from(
    { length: hasMoreThanEqualOneYear ? ammountByMonth + 1 : 12 },
    (_, index) => {
      const date = DateTime.now().plus({ months: index }).toFormat(keyFormat);
      return { key: date, value: recurrent, isRecurrentOnly: true };
    },
  ).reduce((acc, curr) => ({ ...acc, ...{ [curr.key]: curr } }), {});

  Object.entries(byMonth).forEach(([key, value]) => {
    if (valuesByMonth[key]) {
      valuesByMonth[key] = {
        ...valuesByMonth[key],
        value: valuesByMonth[key].value + value,
        isRecurrentOnly: false,
      };
    } else {
      valuesByMonth[key] = { key, value, isRecurrentOnly: false };
    }
  });

  return Object.values(valuesByMonth);
};
