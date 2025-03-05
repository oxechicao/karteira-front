"use client";

import { LDatePicker } from "@common/components/form/LDatePicker";
import { RowCol } from "@common/components/grid/RowCol";
import { doMask } from "@common/utils/doMask";
import { Expense } from "@modules/expense/models/Expense";
import { ExpenseModel } from "@modules/expense/models/ExpenseModel";
import { useForm } from "@refinedev/antd";
import type { FormProps } from "antd";
import { Form, Input, InputNumber, Select } from "antd";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

interface CreateFormProps {
  createFormProps: FormProps<ExpenseModel>;
  initialValues?: ExpenseModel;
}

const updateLastPaymentAt = (
  createFormProps: FormProps<ExpenseModel>,
  installmentTotal: number,
  formPurchasedAt?: DateTime,
): boolean => {
  const purchasedAt = formPurchasedAt || DateTime.now();

  createFormProps?.form?.setFieldValue(
    ["timeline", "lastPaymentAt"],
    purchasedAt.plus({
      months: installmentTotal,
    }),
  );
  return true;
};

const updatePurchaseAt = (
  createFormProps: FormProps<ExpenseModel>,
  currentInstallment: number,
  purchasedAt?: DateTime,
  manualPurchasedDate?: DateTime,
): DateTime | undefined => {
  let newDate: DateTime | undefined = undefined;

  if (currentInstallment === 0 && manualPurchasedDate) {
    newDate = manualPurchasedDate;
  }

  console.log(purchasedAt);
  if (currentInstallment > 0 && manualPurchasedDate && purchasedAt) {
    return;
  }

  newDate = DateTime.now().minus({ months: currentInstallment + 1 });

  if (!newDate) return;

  createFormProps.form?.setFieldValue(["timeline", "purchasedAt"], newDate);
  return newDate;
};

export const FormExpense: React.FC<CreateFormProps> = ({
  createFormProps,
  initialValues,
}) => {
  const [manualPurchasedDate, setManualPurchasedDate] = useState<DateTime>();

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
        ]}
      />
      <RowCol
        spanSizes={{ 0: 8, 3: 8 }}
        items={[
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
        items={[
          <>
            <Form.Item
              initialValue={initialValues?.definition?.form?.name || "credit"}
              label="Forma de pagamento"
              name={["definition", "form", "name"]}
              required
            >
              <Select>
                <Select.Option value="credit">Crédito</Select.Option>
                <Select.Option value="debit">Pix/Débito</Select.Option>
              </Select>
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
              <Select>
                <Select.Option value="installment">Parcelado</Select.Option>
                <Select.Option value="debit">Pix/Débito</Select.Option>
                <Select.Option value="planning">
                  Planejamento/Reserva
                </Select.Option>
                <Select.OptGroup label="Recorrentes">
                  <Select.Option value="monthly">Mensal</Select.Option>
                  <Select.Option value="yearly">Anualmente</Select.Option>
                  <Select.Option value="weekly">Semanalmente</Select.Option>
                </Select.OptGroup>
              </Select>
            </Form.Item>
          </>,
          <>
            <Form.Item
              initialValue={initialValues?.definition?.source?.name || "itau"}
              label="Fonte"
              name={["definition", "source", "name"]}
              required
            >
              <Select
                showSearch
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
              <Select
                showSearch
                options={[
                  { label: "Casa", value: "casa" },
                  { label: "Fast Food", value: "fastfood" },
                  { label: "Pessoal", value: "pessoal" },
                  { label: "Baby Chicones", value: "chicao" },
                  { label: "Baby Lore", value: "lore" },
                  { label: "Mercado", value: "mercado" },
                  { label: "Farmácia", value: "farmacia" },
                  { label: "Saúde", value: "saude" },
                  { label: "Pet", value: "pet" },
                  { label: "Eventos", value: "eventos" },
                  { label: "Viagem", value: "viagem" },
                  { label: "Transporte", value: "transporte" },
                  { label: "Streaming", value: "streaming" },
                  { label: "Vesturário", value: "vestuario" },
                  { label: "Educação", value: "educação" },
                  { label: "Jogos", value: "jogos" },
                  { label: "Reservas", value: "reservas" },
                  { label: "Etc", value: "etc" },
                ]}
              />
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
