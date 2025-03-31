"use client";

import TableExpense from "@modules/expense/features/list/TableExpense";
import { ExpenseDocument } from "@modules/expense/schemas/ExpenseSchema";
import { List, useTable } from "@refinedev/antd";

export default function ListExpensePage() {
  const { tableProps } = useTable<ExpenseDocument>();
  return (
    <List resource="despesas" title="Lista de Despesas">
      <TableExpense tableProps={tableProps} />
    </List>
  );
}
