"use client";

import DeleteButtonTableList from "@common/components/button/DeleteButtonTableList";
import { moneyMask } from "@common/utils/doMask";
import { TagDefinition } from "@modules/expense/components/TagDefinition";
import { Col, Row, Table, type TableProps } from "antd";
import { DateTime } from "luxon";
import { PayButton } from "@modules/expense/components/PayButton";
import React from "react";
import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { EditButton } from "@refinedev/antd";
import { EditOutlined } from "@ant-design/icons";
import { ExpenseListTable } from "@modules/expense/models/ExpenseListTable";

type ListExpenseProps = {
  tableProps: TableProps<ExpenseListTable>;
  openPaymentModal: (e: any) => void;
};

export const TableExpense: React.FC<ListExpenseProps> = (props) => {
  const { tableProps, openPaymentModal } = props;

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
      render: (value: number, record: ExpenseListTable) =>
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
      render: (_: any, record: ExpenseListTable) => {
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
              <EditButton
                key="button-edit"
                color="gold"
                variant="solid"
                icon={<EditOutlined />}
                recordItemId={id}
              >
                Editar
              </EditButton>
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
