"use client";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { RowCol } from "@common/components/grid/RowCol";
import { ExpenseTemplateModel } from "@modules/expenseTemplates/models/ExpenseTemplateModel";
import {
  ExpenseTemplate,
  ExpenseTemplateDocument,
} from "@modules/expenseTemplates/schemas/ExpenseTemplateSchema";
import { Button, Table, TableProps } from "antd";
import React, { Dispatch, SetStateAction } from "react";

type TableExpenseTemplateProps = {
  tableProps: TableProps<ExpenseTemplate>;
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
        return (
          <RowCol
            gutter={0}
            items={[
              <Button
                key="button-edit"
                color="gold"
                variant="solid"
                icon={<EditOutlined />}
                onClick={() => {
                  openEditModal(record?._id || "");
                }}
              >
                Editar
              </Button>,
              <Button
                key="button-delete"
                color="danger"
                variant="solid"
                icon={<DeleteOutlined />}
                onClick={() => {
                  // Handle delete action
                }}
              >
                Excluir
              </Button>,
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
