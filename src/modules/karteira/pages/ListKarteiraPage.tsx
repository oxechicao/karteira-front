"use client";

import React from "react";
import { EditButton, List, useTable } from "@refinedev/antd";
import { Col, Row, Table, TableColumnsType } from "antd";
import { IKarteiraModel } from "@modules/karteira/models/IKarteiraModel";
import { EditOutlined } from "@ant-design/icons";

export const ListKarteiraPage: React.FC = () => {
  const { tableProps } = useTable<IKarteiraModel>({
    resource: "karteiras",
  });

  const columns: TableColumnsType<IKarteiraModel> = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Proprietária",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Convidadas",
      dataIndex: "guests",
      key: "guests",
      render: (value: IKarteiraModel["guests"]) => (
        <>
          {value.map((guest: IGuestModel) => (
            <p key={guest.email}>{guest.email}</p>
          ))}
        </>
      ),
    },
    {
      title: "Meta",
      dataIndex: "goal",
      key: "goal",
    },
    {
      title: "Limite",
      dataIndex: "limit",
      key: "limit",
    },
    {
      title: "Ações",
      dataIntex: "operation",
      key: "operation",
      render: (_, record: IKarteiraModel) => {
        const id = (record?._id as string) || "";
        return (
          <Row gutter={2} justify="end">
            <Col>
              <EditButton
                key="button-edit"
                color="gold"
                variant="solid"
                icon={<EditOutlined />}
                recordItemId={id}
              />
            </Col>
          </Row>
        );
      },
    },
  ];
  return (
    <List
      resource="karteiras"
      title="Lista de Karteiras"
      createButtonProps={{
        children: "Novo",
      }}
    >
      <Table
        {...tableProps}
        dataSource={tableProps.dataSource || []}
        rowKey="_id"
        pagination={false}
        columns={columns}
      />
    </List>
  );
};
