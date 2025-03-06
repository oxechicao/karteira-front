"use client";
import { CardsSummary } from "@modules/expense/components/CardSummary";
import { mapValuesSummary } from "@modules/expense/components/SummaryExpense/utils";
import { Expense } from "@modules/expense/models/Expense";
import type { TableProps } from "antd";
import { Flex, Tabs } from "antd";

interface SummaryExpenseProps {
  tableProps: TableProps<Expense>;
}

export const SummaryExpense: React.FC<SummaryExpenseProps> = ({
  tableProps,
}) => {
  const valuesSummary = mapValuesSummary(tableProps?.dataSource || []);

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
              <CardsSummary
                valueByMonth={valuesSummary}
                loading={!!tableProps.loading}
              />
            </Flex>
          ),
        },
      ]}
    />
  );
};
