"use client";

import { LDatePicker } from "@common/components/form/LDatePicker";
import { RowCol } from "@common/components/grid/RowCol";
import { ExpenseEntity } from "@modules/expense/models/Expense";
import { Button, Form, Input, InputNumber, Select } from "antd";
import type { FormProps } from "antd";

import { DateTime } from "luxon";

interface CreateFormProps {
  createFormProps: FormProps<{}>;
}

export const FormExpense: React.FC<CreateFormProps> = ({ createFormProps }) => {
  // const [form] = Form.useForm();
  // const onFinish = (values: ExpenseEntity) => {
  //   console.log(values);
  // };

  return (
    // <Form
    //   onFinish={onFinish}
    //   form={form}
    //   onSubmitCapture={(e) => console.log(e)}
    //   layout="vertical"
    // >
    <Form {...createFormProps} layout="vertical">
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
              name={["timeline", "purshasedAt"]}
              required
            >
              <LDatePicker className="w-full" />
            </Form.Item>
          </>,
          <>
            <Form.Item
              label="Ultima data de pagamento"
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
            <Form.Item label="Valor" name="value" required>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </>,
          <>
            <Form.Item
              label="Total de Parcelas"
              name={["installment", "total"]}
              required
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </>,
          <>
            <Form.Item label="Parcelas pagas" name={["installment", "current"]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </>,
          <>
            <Form.Item
              label="Adicional da primeira parcela"
              name={["installment", "firstInstallmentAdditionalValue"]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </>,
        ]}
      />

      <RowCol
        items={[
          <>
            <Form.Item
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
              label="Fonte"
              name={["definition", "source", "name"]}
              required
            >
              <Select
                options={[
                  { label: "Itaú", value: "itau" },
                  { label: "Nubank", value: "nubank" },
                  { label: "Inter", value: "inter" },
                  { label: "Irmão", value: "irmão" },
                ]}
              />
            </Form.Item>
          </>,
          <>
            <Form.Item
              label="Categoria"
              name={["definition", "category", "name"]}
              required
            >
              <Select
                options={[
                  { label: "Fast Food", value: "fastfood" },
                  { label: "Pessoal", value: "pessoal" },
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
                  { label: "Jogos", value: "Jogos" },
                  { label: "Reservas", value: "reservas" },
                  { label: "Etc", value: "Etc" },
                ]}
              />
            </Form.Item>
          </>,
        ]}
      />
    </Form>
  );
};
