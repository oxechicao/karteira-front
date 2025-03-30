import { LDatePicker } from "@common/components/form/LDatePicker";
import { RowCol } from "@common/components/grid/RowCol";
import { doMask, moneyMask } from "@common/utils/doMask";
import { FormExpenseNoRequired } from "@modules/expense/components/FormExpense/FormExpense";
import { ExpenseModel } from "@modules/expense/models/ExpenseModel";
import { Form, Input, InputNumber } from "antd";
import useFormInstance from "antd/es/form/hooks/useFormInstance";

export const FormBaseExpense: React.FC<FormExpenseNoRequired> = ({
  notRequired,
}) => {
  const { setFieldValue } = useFormInstance<ExpenseModel>();

  return (
    <RowCol
      items={[
        <Form.Item key="name" label="Nome" name="name" required={!notRequired}>
          <Input />
        </Form.Item>,
        <Form.Item
          key="purchasedAt"
          label="Valor"
          name="value"
          required={!notRequired}
        >
          <Input
            addonBefore="R$"
            onChange={(e) =>
              setFieldValue(
                "value",
                moneyMask(String(e.target.value).replace(/\D/g, "")),
              )
            }
            style={{ width: "100%" }}
          />
        </Form.Item>,
        <Form.Item
          key="purchasedAt"
          label="Data da compra"
          name="purchasedAt"
          required={!notRequired}
        >
          <LDatePicker className="w-full" />
        </Form.Item>,
        <Form.Item
          key="purchasedAt"
          label="Dia do vencimento (pagamento)"
          name="payday"
          required={!notRequired}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>,
      ]}
    />
  );
};
