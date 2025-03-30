"use client";

import { FormBaseExpense } from "@modules/expense/components/FormExpense/FormBaseExpense";
import { FormDetailsExpense } from "@modules/expense/components/FormExpense/FormDetailsExpense";
import { FormPaymentExpense } from "@modules/expense/components/FormExpense/FormPaymentExpense";
import { Col, Divider, Form, Input, Row, Space } from "antd";

export type FormExpenseNoRequired = {
  notRequired?: boolean;
};

export const FormExpense: React.FC<FormExpenseNoRequired> = ({
  notRequired = false,
}) => {
  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <Row>
          <Col span={24}>
            <Divider orientation="left">Informações básicas</Divider>
            <FormBaseExpense notRequired={notRequired} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Divider orientation="left">Detalhes do Pagamento</Divider>
            <FormPaymentExpense notRequired={notRequired} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Divider orientation="left">Detalhes do Despesa</Divider>
            <FormDetailsExpense notRequired={notRequired} />
          </Col>
        </Row>
      </Space>
      <Form.Item name="karteira" hidden>
        <Input />
      </Form.Item>
    </>
  );
};
