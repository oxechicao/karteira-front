import { LDatePicker } from "@common/components/form/LDatePicker";
import { RowCol } from "@common/components/grid/RowCol";
import { FormExpenseNoRequired } from "@modules/expense/components/FormExpense/FormExpense";
import { Form, Input, InputNumber } from "antd";

export const FormBaseExpense: React.FC<FormExpenseNoRequired> = ({
  notRequired,
}) => {
  return (
    <RowCol
      items={[
        <Form.Item key="name" label="Nome" name="name" required={!notRequired}>
          <Input />
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
          name="dueDate"
          required={!notRequired}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>,
      ]}
    />
  );
};
