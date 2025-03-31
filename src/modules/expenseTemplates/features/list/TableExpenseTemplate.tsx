"use client";

import { RowCol } from "@common/components/grid/RowCol";
import DeleteButtonExpense from "@modules/expenseTemplates/features/delete/DeleteButtonExpense";
import EditButtonExpense from "@modules/expenseTemplates/features/edit/EditButtonExpense";
import {
  ExpenseTemplateSchemaModel,
  ExpenseTemplateDocument,
} from "@modules/expenseTemplates/schemas/ExpenseTemplateSchema";
import { Table, TableProps } from "antd";
import React from "react";

type TableExpenseTemplateProps = {
  tableProps: TableProps<ExpenseTemplateDocument>;
  openEditModal: (e: any) => void;
};

export const TableExpenseTemplate: React.FC<TableExpenseTemplateProps> = ({
  tableProps,
  openEditModal,
}) => {
  const columns = [
    {
      title: "Nome",
      dataIndex: "templateName",
      key: "name",
    },
    {
      title: "Ações",
      dataIndex: "actions",
      width: "250px",
      render: (_: any, record: ExpenseTemplateDocument) => {
        const id: string = (record?._id as string) || "";
        return (
          <RowCol
            gutter={0}
            items={[
              <EditButtonExpense
                key="edit-button"
                id={id}
                openModal={openEditModal}
              />,
              <DeleteButtonExpense key="delete-button" id={id} />,
            ]}
          />
        );
      },
    },
  ];

  return (
    <>
      <Table
        {...tableProps}
        loading={tableProps.loading}
        dataSource={tableProps.dataSource || []}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />
    </>
  );
};
