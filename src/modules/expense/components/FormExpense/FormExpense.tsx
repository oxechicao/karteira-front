"use client";

import { LDatePicker } from "@common/components/form/LDatePicker";
import { RowCol } from "@common/components/grid/RowCol";
import { doMask } from "@common/utils/doMask";
import { FormBaseExpense } from "@modules/expense/components/FormExpense/FormBaseExpense";
import { FormDetailsExpense } from "@modules/expense/components/FormExpense/FormDetailsExpense";
import { FormPaymentExpense } from "@modules/expense/components/FormExpense/FormPaymentExpense";
import {
  categoryOptions,
  formOptions,
  frequencyOptions,
  typeOptions,
} from "@modules/expense/components/FormExpense/options";
import {
  updateLastPaymentAt,
  updatePurchaseAt,
} from "@modules/expense/components/FormExpense/utils";
import {
  FrequencyEnum,
  FrequencyPeriodEnum,
} from "@modules/expense/enums/FrequencyEnum";
import { ExpenseModel } from "@modules/expense/models/ExpenseModel";
import type { FormProps } from "antd";
import {
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Space,
} from "antd";
import { DateTime } from "luxon";
import { useState } from "react";

interface CreateFormProps {
  createFormProps: FormProps<ExpenseModel>;
  initialValues?: ExpenseModel;
}

const radioStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export const FormExpense: React.FC<CreateFormProps> = ({ createFormProps }) => {
  return (
    <Form {...createFormProps} layout="vertical">
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <Row>
          <Col span={24}>
            <Divider orientation="left">Informações básicas</Divider>
            <FormBaseExpense />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Divider orientation="left">Detalhes do Pagamento</Divider>
            <FormPaymentExpense />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Divider orientation="left">Detalhes do Despesa</Divider>
            <FormDetailsExpense />
          </Col>
        </Row>
      </Space>
      <Form.Item name="karteira" hidden>
        <Input />
      </Form.Item>
    </Form>
  );
};
