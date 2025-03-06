"use client";

import { LDatePicker } from "@common/components/form/LDatePicker";
import { RowCol } from "@common/components/grid/RowCol";
import { doMask } from "@common/utils/doMask";
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
  ExpenseModel,
  FrequencyType,
} from "@modules/expense/models/ExpenseModel";
import { useForm } from "@refinedev/antd";
import type { FormProps } from "antd";
import {
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
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

export const FormExpense: React.FC<CreateFormProps> = ({
  createFormProps,
  initialValues,
}) => {
  const [manualPurchasedDate, setManualPurchasedDate] = useState<DateTime>();

  const definitionType = Form.useWatch(
    ["definition", "type", "name"],
    createFormProps.form,
  );
  const frequencyType = Form.useWatch(
    ["definition", "frequency", "name"],
    createFormProps.form,
  );

  const periodMax: { [key in FrequencyType]: number } = {
    days: 366,
    weeks: 4,
    months: 12,
    years: 3,
  };

  createFormProps.onValuesChange = (changedValues, allValues) => {
    if (changedValues?.installment?.total !== undefined) {
      updateLastPaymentAt(
        createFormProps,
        changedValues.installment.total,
        allValues?.timeline?.purchasedAt,
      );
    }

    if (changedValues?.installment?.current !== undefined) {
      const updated = updatePurchaseAt(
        createFormProps,
        changedValues.installment.current,
        allValues?.timeline?.purchasedAt,
        manualPurchasedDate,
      );

      if (updated && allValues?.installment?.total !== undefined) {
        updateLastPaymentAt(
          createFormProps,
          allValues.installment.total,
          updated,
        );
      }
    }

    if (
      changedValues?.timeline?.purchasedAt ||
      changedValues?.timeline?.purchasedAt === null
    ) {
      setManualPurchasedDate(changedValues.timeline.purchasedAt);
    }

    if (changedValues?.flags?.isRecurrent) {
      createFormProps?.form?.setFieldValue(
        ["installment", "current"],
        changedValues.flags.isRecurrent ? 0 : undefined,
      );
    }
  };

  return (
    <Form {...createFormProps} initialValues={initialValues} layout="vertical">
      <RowCol
        spanSizes={{ 1: 4 }}
        items={[
          <>
            <Form.Item label="Nome" name="name" required>
              <Input />
            </Form.Item>
          </>,
          <>
            <Form.Item
              label="Valor da parcela"
              name={["price", "value"]}
              required
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) => {
                  return `R$ ${doMask(String(value), "###.###.###,##", {
                    reverse: true,
                  })}`;
                }}
                parser={(value) => {
                  return String(value).replace(/\D/g, "");
                }}
              />
            </Form.Item>
          </>,
          <>
            <Form.Item
              label="Total de Parcelas"
              name={["installment", "total"]}
              required
            >
              <InputNumber min={1} max={120} style={{ width: "100%" }} />
            </Form.Item>
          </>,
          <>
            <Form.Item label="Parcelas pagas" name={["installment", "current"]}>
              <InputNumber min={0} max={120} style={{ width: "100%" }} />
            </Form.Item>
          </>,
        ]}
      />
      <RowCol
        spanSizes={{ 0: 8, 3: 8 }}
        items={[
          <>
            <Form.Item
              label="Data da compra"
              name={["timeline", "purchasedAt"]}
              required
            >
              <LDatePicker className="w-full" />
            </Form.Item>
          </>,
          <>
            <Form.Item
              label="Data do fim do pagamento"
              name={["timeline", "lastPaymentAt"]}
            >
              <LDatePicker className="w-full" />
            </Form.Item>
          </>,
          <>
            <Form.Item
              label="Adicional da primeira parcela"
              name={["installment", "firstInstallmentAdditionalValue"]}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) => {
                  return `R$ ${doMask(String(value), "###.###.###,##", {
                    reverse: true,
                  })}`;
                }}
                parser={(value) => {
                  return String(value).replace(/\D/g, "");
                }}
              />
            </Form.Item>
          </>,
        ]}
      />

      <RowCol
        align="top"
        items={[
          <>
            <Form.Item
              initialValue={initialValues?.definition?.form?.name || "credit"}
              label="Forma de pagamento"
              name={["definition", "form", "name"]}
              required
            >
              <Radio.Group style={radioStyle} options={formOptions} />
            </Form.Item>
          </>,
          <>
            <Form.Item
              initialValue={
                initialValues?.definition?.type?.name || "installment"
              }
              label="Tipo de pagamento"
              name={["definition", "type", "name"]}
              required
            >
              <Radio.Group style={radioStyle} options={typeOptions} />
            </Form.Item>
          </>,
          <>
            <Form.Item
              label="Qual a frequencia?"
              name={["definition", "frequency", "name"]}
            >
              <Radio.Group
                style={radioStyle}
                disabled={String(definitionType) !== "recurrent"}
                options={frequencyOptions}
              />
            </Form.Item>
          </>,
          <>
            <Form.Item
              label="Período"
              name={["definition", "frequency", "period"]}
            >
              <InputNumber
                style={{ width: "100%" }}
                disabled={String(definitionType) !== "recurrent"}
                min={1}
                max={periodMax[String(frequencyType) as FrequencyType] || 30}
              />
            </Form.Item>
          </>,
        ]}
      />
      <RowCol
        spanSizes={{ 0: 6 }}
        align="top"
        items={[
          <>
            <Form.Item
              initialValue={initialValues?.definition?.source?.name || "itau"}
              label="Fonte do pagamento"
              name={["definition", "source", "name"]}
              required
            >
              <Radio.Group
                style={radioStyle}
                options={[
                  { label: "Itaú", value: "itau" },
                  { label: "Nubank", value: "nubank" },
                  { label: "Inter", value: "inter" },
                  { label: "Irmão", value: "irmao" },
                ]}
              />
            </Form.Item>
          </>,
          <>
            <Form.Item
              initialValue={
                initialValues?.definition?.category?.name || "pessoal"
              }
              label="Categoria"
              name={["definition", "category", "name"]}
              required
            >
              <Radio.Group
                style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
              >
                <Row>
                  {categoryOptions.map(({ label, value }) => (
                    <Col
                      key={value}
                      xs={{ flex: "100%" }}
                      sm={{ flex: "50%" }}
                      md={{ flex: "33%" }}
                    >
                      <Radio value={value}>{label}</Radio>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Form.Item>
          </>,
        ]}
      />
      <Form.Item name="karteira" hidden>
        <Input />
      </Form.Item>
    </Form>
  );
};
