import { RowCol } from "@common/components/grid/RowCol";
import { frequencyOptions } from "@modules/expense/components/FormExpense/options";
import {
  FrequencyEnum,
  FrequencyPeriodEnum,
} from "@modules/expense/enums/FrequencyEnum";
import { Checkbox, Form, InputNumber, Select } from "antd";
import { useEffect } from "react";

const inputStyle: { style: React.CSSProperties } = { style: { width: "100%" } };

export const FormPaymentExpense: React.FC = () => {
  const form = Form.useFormInstance();
  const isRecurrent = Form.useWatch(["payment", "isRecurrent"], {
    form,
  });

  const frequency = Form.useWatch<FrequencyEnum>(["payment", "frequency"], {
    form,
  });

  const maxPeriod: Record<FrequencyEnum, FrequencyPeriodEnum> = {
    [FrequencyEnum.DAYS]: FrequencyPeriodEnum.DAYS,
    [FrequencyEnum.WEEKS]: FrequencyPeriodEnum.WEEKS,
    [FrequencyEnum.MONTHS]: FrequencyPeriodEnum.MONTHS,
    [FrequencyEnum.YEARS]: FrequencyPeriodEnum.YEARS,
  };

  console.log(maxPeriod, frequency);

  return (
    <RowCol
      items={[
        <Form.Item
          key="payment-totalInstallments"
          label="Total de Parcelas"
          name={["payment", "totalInstallments"]}
          required
        >
          <InputNumber {...inputStyle} />
        </Form.Item>,
        <Form.Item
          key="payment-currentInstallment"
          label="Total de Parcelas Pagas"
          name={["payment", "currentInstallment"]}
          required
        >
          <InputNumber {...inputStyle} />
        </Form.Item>,
        <Form.Item
          key="payment-isFirstPaymentNextMonth"
          label="A primeira cobrança é no próximo mês?"
          name={["payment", "isFirstPaymentNextMonth"]}
          initialValue={true}
        >
          <Select
            options={[
              { value: true, label: "Sim" },
              { value: false, label: "Não" },
            ]}
          />
        </Form.Item>,
        <Form.Item
          key="payment-isRecurrent"
          label="É compra recorrente?"
          name={["payment", "isRecurrent"]}
          initialValue={false}
        >
          <Select
            options={[
              { value: true, label: "Sim" },
              { value: false, label: "Não" },
            ]}
          />
        </Form.Item>,
        <Form.Item
          key="payment-frequency"
          label="Tipo de frequência"
          name={["payment", "frequency"]}
          required={isRecurrent}
        >
          <Select
            disabled={!isRecurrent}
            options={frequencyOptions}
            placeholder="Selecione"
          />
        </Form.Item>,
        <Form.Item
          key="installment-frequencyPeriod"
          label="Período"
          name={["payment", "frequencyPeriod"]}
          required
        >
          <InputNumber
            disabled={!isRecurrent}
            max={maxPeriod[frequency]}
            {...inputStyle}
          />
        </Form.Item>,
      ]}
    />
  );
};
