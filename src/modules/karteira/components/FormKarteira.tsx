"use client";

import { Col, Form, Input, Row } from "antd";
import { IKarteiraModel } from "@modules/karteira/models/IKarteiraModel";
import { useForm } from "@refinedev/antd";
import { moneyMask } from "@common/utils/doMask";

export const FormKarteira: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IKarteiraModel>();
  const { form } = formProps;

  const maskValue = (key: string, value: string) => {
    form.setFieldValue(key, moneyMask(String(value).replace(/\D/g, "")));
  };

  return (
    <Form
      {...formProps}
      layout="vertical"
      saveButtonProps={{ ...saveButtonProps, children: <>Salvar</> }}
    >
      <Form.Item name="name" label="Nome da karteira">
        <Input />
      </Form.Item>
      <Form.Item name="owner" label="Dona da karteira">
        <Input placeholder="owner@email.com" />
      </Form.Item>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="goal" label="Meta">
            <Input
              placeholder="1.000,00"
              addonBefore="R$"
              onChange={(e) => maskValue("goal", e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="limit" label="Limite de gastos (Teto)">
            <Input
              placeholder="1.000,00"
              addonBefore="R$"
              onChange={(e) => maskValue("limit", e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
