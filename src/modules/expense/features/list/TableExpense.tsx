"use client";

import DeletButtonTableList from "@common/components/button/DeleteButtonTableList";
import EditButtonModal from "@common/components/button/EditButtonModal";
import { moneyMask } from "@common/utils/doMask";
import { TagDefinition } from "@modules/expense/components/TagDefinition";
import { ExpenseDocument } from "@modules/expense/expense.schema";
import { Table, type TableProps } from "antd";
import { DateTime } from "luxon";

type ListExpenseProps = {
  tableProps: TableProps<ExpenseDocument>;
  openEditModal: (e: any) => void;
};

export default function TableExpense({
  tableProps,
  openEditModal,
}: ListExpenseProps) {
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
      dataIndex: ["purchasedAt"],
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
    {
      title: "Ações",
      dataIndex: "table-actions",
      key: "table-actions",
      width: "250px",
      render: (_: any, record: ExpenseDocument) => {
        const id = (record?._id as string) || "";
        return (
          <>
            <EditButtonModal id={id} openModal={openEditModal} />
            <DeletButtonTableList id={id} resource="despesas" />
          </>
        );
      },
    },
  ];

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
