"use client";

import { moneyMask } from "@common/utils/doMask";
import { TagDefinition } from "@modules/expense/components/TagDefinition";
import { ExpenseDocument } from "@modules/expense/schemas/ExpenseSchema";
import { Table, type TableProps } from "antd";
import { DateTime } from "luxon";

const columns = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Valor",
    dataIndex: "value",
    key: "price.value",
    render: (value: number) => `R$ ${moneyMask(String(value))}`,
  },
  {
    title: "Parcela",
    dataIndex: ["payment", "currentInstallment"],
    key: "installment.current",
    render: (value: number, record: ExpenseDocument) =>
      `${value}/${record.payment.currentInstallment}`,
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
    render: (value: string) => <TagDefinition value={value} />,
  },
  {
    title: "Fonte",
    dataIndex: ["definition", "source", "name"],
    key: "definition.source.name",
    render: (value: string) => <TagDefinition value={value} />,
  },
  {
    title: "Forma",
    dataIndex: ["definition", "form", "name"],
    key: "definition.form.name",
    render: (value: string) => <TagDefinition value={value} />,
  },
  {
    title: "Tipo",
    dataIndex: ["definition", "type", "name"],
    key: "definition.type.name",
    render: (value: string) => <TagDefinition value={value} />,
  },
];

type ListExpenseProps = {
  tableProps: TableProps<ExpenseDocument>;
};

export default function TableExpense({ tableProps }: ListExpenseProps) {
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
}
