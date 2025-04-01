import { LDatePicker } from "@common/components/form/LDatePicker";
import { RowCol } from "@common/components/grid/RowCol";
import { moneyMask } from "@common/utils/doMask";
import { ExpenseModelForm } from "@modules/expense/expense.type";
import { FormExpenseNoRequired } from "@modules/expenseTemplate/components/FormExpenseModel/FormExpenseModel";
import { Form, Input, InputNumber } from "antd";
import useFormInstance from "antd/es/form/hooks/useFormInstance";

export default function FormBaseExpense({
  notRequired,
}: FormExpenseNoRequired) {
  const { setFieldValue } = useFormInstance<ExpenseModelForm>();

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
}
