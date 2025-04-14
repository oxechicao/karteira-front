"use client";

import DeleteButtonTableList from "@common/components/button/DeleteButtonTableList";
import { moneyMask } from "@common/utils/doMask";
import { Col, Row, Table, TableColumnsType, type TableProps, Tag } from "antd";
import { DateTime } from "luxon";
import { PayButton } from "@modules/expense/components/PayButton";
import React from "react";
import { EditButton } from "@refinedev/antd";
import { EditOutlined } from "@ant-design/icons";
import { ExpenseListTable } from "@modules/expense/models/ExpenseListTable";
import { getPaydayThisMonth } from "@modules/expense/utils/getPaydayThisMonth";
import {
  CategoryColorEnum,
  CategoryEnum,
  CategoryLabelEnum,
} from "@modules/expense/constants/CategoryEnum";
import {
  FormColorEnum,
  FormEnum,
  FormLabelEnum,
} from "@modules/expense/constants/FormEnum";
import {
  TypeColorEnum,
  TypeEnum,
  TypeLabelEnum,
} from "@modules/expense/constants/TypeValueEnum";

type ListExpenseProps = {
  tableProps: TableProps<ExpenseListTable>;
  openPaymentModal: (e: any) => void;
};

export const TableExpense: React.FC<ListExpenseProps> = (props) => {
  const { tableProps, openPaymentModal } = props;

  const columns: TableColumnsType<ExpenseListTable> = [
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
      title: "Parcelas",
      dataIndex: ["payment", "currentInstallment"],
      key: "payment.currentInstallment",
      render: (value: number, record: ExpenseListTable) => {
        const installmentText = `${value}/${record.payment.totalInstallments}`;

        const lastInstallmentPaid = record.payment.installments
          .filter((installment) => {
            return installment.isPaid;
          })
          .pop();

        const paydayThisMonth = getPaydayThisMonth(record.payment.payday);
        const isNowPreviousPayday =
          lastInstallmentPaid && lastInstallmentPaid.date <= paydayThisMonth;

        if (!lastInstallmentPaid || isNowPreviousPayday) {
          return (
            <Row>
              <Col span={24}>{installmentText}</Col>
              <Col span={24}>
                <Tag color="red">Mês Não pago</Tag>
              </Col>
            </Row>
          );
        }

        const isPaid = lastInstallmentPaid.isPaid;

        return (
          <Row gutter={3}>
            <Col span={24}>{installmentText}</Col>
            <Col span={24}>
              <Tag color={isPaid ? "green" : "red"}>
                Mês {isPaid ? "Pago" : "Não pago"}
              </Tag>
            </Col>
          </Row>
        );
      },
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
      render: (value: keyof typeof CategoryEnum) => (
        <Tag color={CategoryColorEnum[CategoryEnum[value]]}>
          {CategoryLabelEnum[CategoryEnum[value]]}
        </Tag>
      ),
    },
    {
      title: "Fonte",
      dataIndex: ["details", "source"],
      key: "details.source",
      render: (value) => <Tag>{value}</Tag>,
    },
    {
      title: "Forma",
      dataIndex: ["details", "form"],
      key: "details.form",
      render: (value: keyof typeof FormEnum) => (
        <Tag color={FormColorEnum[FormEnum[value]]}>
          {FormLabelEnum[FormEnum[value]]}
        </Tag>
      ),
    },
    {
      title: "Tipo",
      dataIndex: ["details", "type"],
      key: "details.type",
      render: (value: keyof typeof TypeEnum) => (
        <Tag color={TypeColorEnum[TypeEnum[value]]}>
          {TypeLabelEnum[TypeEnum[value]]}
        </Tag>
      ),
    },
    {
      title: "Ações",
      dataIndex: "operations",
      key: "operations",
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
