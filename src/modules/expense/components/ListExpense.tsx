"use client";

import { ExpenseEntity } from "@modules/expense/models/Expense";
import { Table, type TableProps } from "antd";

interface ListExpenseProps {
  tableProps: TableProps<ExpenseEntity>;
}

export const ListExpense: React.FC<ListExpenseProps> = ({ tableProps }) => {
  return (
    <Table {...tableProps} rowKey="id">
      <Table.Column title="Nome" dataIndex="name" />
      <Table.Column title="Valor" dataIndex="value" />
    </Table>
  );
};
