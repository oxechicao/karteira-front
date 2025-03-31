"use client";
import { CardsSummary } from "@modules/expense/components/CardSummary";
import { ExpenseDocument } from "@modules/expense/expense.schema";
import type { TableProps } from "antd";
import { Flex, Tabs } from "antd";

type SummaryExpenseProps = {
  tableProps: TableProps<ExpenseDocument>;
};

export const SummaryExpense: React.FC<SummaryExpenseProps> = ({
  tableProps,
}) => {
  const valuesSummary = [{}];

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
