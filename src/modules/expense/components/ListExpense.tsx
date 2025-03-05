"use client";

import { moneyMask } from "@common/utils/doMask";
import { TagDefinition } from "@modules/expense/components/TagDefinition";
import { Expense } from "@modules/expense/models/Expense";
import { DefinitionsTag } from "@modules/expense/models/ExpenseModel";
import { Table, type TableColumnProps, type TableProps } from "antd";
import { DateTime } from "luxon";

const columns = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Valor",
    dataIndex: ["price", "value"],
    key: "price.value",
    render: (value: number) => `R$ ${moneyMask(String(value))}`,
  },
  {
    title: "Parcela",
    dataIndex: ["installment", "current"],
    key: "installment.current",
    render: (value: number, record: Expense) =>
      `${value}/${record.installment.total}`,
  },
  {
    title: "Data da compra",
    dataIndex: ["timeline", "purchasedAt"],
    key: "timeline.purchasedAt",
    render: (value: string) =>
      DateTime.fromISO(value)
        .setLocale("pt-br")
        .toLocaleString(DateTime.DATE_SHORT),
  },
  {
    title: "Categoria",
    dataIndex: ["definition", "category", "name"],
    key: "definition.category.name",
    render: (value: string) => (
      <TagDefinition value={value as DefinitionsTag} />
    ),
  },
  {
    title: "Fonte",
    dataIndex: ["definition", "source", "name"],
    key: "definition.source.name",
    render: (value: string) => (
      <TagDefinition value={value as DefinitionsTag} />
    ),
  },
  {
    title: "Forma",
    dataIndex: ["definition", "form", "name"],
    key: "definition.form.name",
    render: (value: string) => (
      <TagDefinition value={value as DefinitionsTag} />
    ),
  },
  {
    title: "Tipo",
    dataIndex: ["definition", "type", "name"],
    key: "definition.type.name",
    render: (value: string) => (
      <TagDefinition value={value as DefinitionsTag} />
    ),
  },
];
interface ListExpenseProps {
  tableProps: TableProps<Expense>;
}

export const ListExpense: React.FC<ListExpenseProps> = ({ tableProps }) => {
  return (
    <Table
      {...tableProps}
      loading={tableProps.loading}
      dataSource={tableProps.dataSource || []}
      columns={columns}
      rowKey="_id"
      pagination={false}
    />
  );
};
