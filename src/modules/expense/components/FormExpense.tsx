"use client";

import FormExpenseModel from "@modules/expense-template/components/FormExpenseModel/FormExpenseModel";
import React from "react";
import { FormTemplateExpense } from "@modules/expense/components/FormTemplateExpense";
import { Col, Row, Space } from "antd";

export const FormExpense: React.FC = () => {
  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <Row>
        <Col span={24}>
          <FormTemplateExpense />
        </Col>
      </Row>
      <FormExpenseModel />
    </Space>
  );
};
