"use client";

import DeleteButtonTableList from "@common/components/button/DeleteButtonTableList";
import EditButtonModal from "@common/components/button/EditButtonModal";
import { moneyMask } from "@common/utils/doMask";
import { TagDefinition } from "@modules/expense/components/TagDefinition";
import { ExpenseDocument } from "@modules/expense/expense.schema";
import { Button, Col, Row, Table, type TableProps } from "antd";
import { DateTime } from "luxon";
import { PayButton } from "@modules/expense/components/PayButton";
import React from "react";

type ListExpenseProps = {
  tableProps: TableProps<ExpenseDocument>;
  openEditModal: (e: any) => void;
  openPaymentModal: (e: any) => void;
};

export const TableExpense: React.FC<ListExpenseProps> = (props) => {
  const { tableProps, openEditModal, openPaymentModal } = props;

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
      dataIndex: ["details", "category"],
      key: "details.category",
      render: (value: string) => <TagDefinition value={value} />,
    },
    {
      title: "Fonte",
      dataIndex: ["details", "source"],
      key: "details.source",
      render: (value: string) => <TagDefinition value={value} />,
    },
    {
      title: "Forma",
      dataIndex: ["details", "form"],
      key: "details.form",
      render: (value: string) => <TagDefinition value={value} />,
    },
    {
      title: "Tipo",
      dataIndex: ["details", "type"],
      key: "details.type",
      render: (value: string) => <TagDefinition value={value} />,
    },
    {
      title: "Ações",
      dataIndex: "table-actions",
      key: "table-actions",
      width: 350,
      render: (_: any, record: ExpenseDocument) => {
        const id = (record?._id as string) || "";
        return (
          <Row gutter={4} justify="end">
            <Col>
              <PayButton
                expenseId={id}
                onClick={() => openPaymentModal(id)}
                onlyButton
              />
            </Col>
            <Col>
              <EditButtonModal id={id} openModal={openEditModal} />
            </Col>
            <Col>
              <DeleteButtonTableList id={id} resource="despesas" />
            </Col>
          </Row>
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
};
