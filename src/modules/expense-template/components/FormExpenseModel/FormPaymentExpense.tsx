import { RowCol } from "@common/components/grid/RowCol";
import {
  FrequencyEnum,
  FrequencyPeriodEnum,
} from "@modules/expense/constants/FrequencyEnum";
import { FormExpenseNoRequired } from "@modules/expense-template/components/FormExpenseModel/FormExpenseModel";
import { frequencyOptions } from "@modules/expense/constants/options";
import { Checkbox, Form, InputNumber, Select } from "antd";

const inputStyle: { style: React.CSSProperties } = { style: { width: "100%" } };

export default function FormPaymentExpense({
  notRequired,
}: FormExpenseNoRequired) {
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

  return (
    <>
      <RowCol
        items={[
          <Form.Item
            key="payment-totalInstallments"
            label="Total de Parcelas"
            name={["payment", "totalInstallments"]}
            required={!notRequired}
          >
            <InputNumber {...inputStyle} />
          </Form.Item>,
          <Form.Item
            key="payment-currentInstallment"
            label="Total de Parcelas Pagas"
            name={["payment", "currentInstallment"]}
            required={!notRequired}
          >
            <InputNumber {...inputStyle} />
          </Form.Item>,
          <Form.Item
            key="shouldCreateNewTemplate"
            label="Este mês já foi pago?"
            name="shouldPayCurrentMonth"
            valuePropName="checked"
          >
            <Checkbox
              onChange={(e) =>
                form.setFieldValue("shouldPayCurrentMonth", e.target.checked)
              }
            >
              Já está pago
            </Checkbox>
          </Form.Item>,
        ]}
      />
      <RowCol
        items={[
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
            required={isRecurrent}
          >
            <InputNumber
              disabled={!isRecurrent}
              max={maxPeriod[frequency]}
              {...inputStyle}
            />
          </Form.Item>,
        ]}
      />
    </>
  );
}
