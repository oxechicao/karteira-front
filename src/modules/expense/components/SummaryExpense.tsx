"use client";
import { currentMonthStart } from "@common/utils/date";
import { moneyMask } from "@common/utils/doMask";
import { Expense } from "@modules/expense/models/Expense";
import type { TableProps } from "antd";
import { Card, Flex, Statistic, Tabs } from "antd";
import { DateTime } from "luxon";
import { use, useMemo } from "react";

interface SummaryExpenseProps {
  tableProps: TableProps<Expense>;
}

const keyFormat = "yyyy_MM";
const currentMonthYear = DateTime.now().toFormat(keyFormat);
const getKey = (date: string) => DateTime.fromISO(date).toFormat(keyFormat);

export const SummaryExpense: React.FC<SummaryExpenseProps> = ({
  tableProps,
}) => {
  const sumByMonth = useMemo(
    () =>
      tableProps?.dataSource?.reduce(
        (acc: Record<string, number>, expense) => {
          if (expense.flags.isRecurrent) {
            acc["recurrent"] += expense.price.value;
            return acc;
          }

          expense.timeline.paymentsAt.forEach((payment) => {
            if (DateTime.fromISO(payment.date) < currentMonthStart) return;

            const key = getKey(payment.date);

            if (!acc[key]) acc[key] = 0;

            acc[key] += payment.value;
          });

          return acc;
        },
        { recurrent: 0 },
      ),
    [tableProps.dataSource],
  );

  return (
    <Tabs
      defaultActiveKey="1"
      type="card"
      items={[
        {
          label: "Resumo",
          key: "1",
          children: (
            <Flex gap="large" style={{ width: "100%", overflowX: "auto" }}>
              {Object.entries(sumByMonth || {})
                .filter((entries) => entries[0] !== "recurrent")
                .sort(([a], [b]) => (a > b ? 1 : -1))
                .map(([key, value]) => (
                  <Card key={key} loading={!!tableProps.loading}>
                    <Statistic
                      title={DateTime.fromFormat(`${key}_01`, "yyyy_MM_dd")
                        .setLocale("pt-br")
                        .toFormat("LLLL/yyyy")}
                      value={`R$ ${moneyMask(String(value + (sumByMonth?.recurrent || 0)))}`}
                    />
                  </Card>
                ))}
            </Flex>
          ),
        },
      ]}
    />
  );
};
