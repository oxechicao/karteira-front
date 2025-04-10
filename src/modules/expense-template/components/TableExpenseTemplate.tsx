"use client";

import { RowCol } from "@common/components/grid/RowCol";
import { ExpenseTemplateDocument } from "@modules/expense-template/expense-template.schema";
import { Table, TableProps } from "antd";
import React from "react";
import EditButtonModal from "@common/components/button/EditButtonModal";
import DeletButtonTableList from "@common/components/button/DeleteButtonTableList";

type TableExpenseTemplateProps = {
  tableProps: TableProps<ExpenseTemplateDocument>;
  openEditModal: (e: any) => void;
};

export const TableExpenseTemplate: React.FC<TableExpenseTemplateProps> = (
  props,
) => {
  const { tableProps, openEditModal } = props;
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
              <EditButtonModal
                key="edit-button"
                id={id}
                openModal={openEditModal}
              />,
              <DeletButtonTableList
                key="delete-button"
                id={id}
                resource="contas"
              />,
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
