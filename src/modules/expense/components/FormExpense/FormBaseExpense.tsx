import { LDatePicker } from "@common/components/form/LDatePicker";
import { RowCol } from "@common/components/grid/RowCol";
import { categoryOptions } from "@modules/expense/components/FormExpense/options";
import { Form, Input, Select } from "antd";

export const FormBaseExpense: React.FC = () => {
  return (
    <RowCol
      items={[
        <Form.Item key="name" label="Nome" name="name" required>
          <Input />
        </Form.Item>,
        <Form.Item
          key="purchasedAt"
          label="Data da compra"
          name="purchasedAt"
          required
        >
          <LDatePicker className="w-full" />
        </Form.Item>,
        <Form.Item
          key="purchasedAt"
          label="Data do vencimento (pagamento)"
          name="dueDate"
          required
        >
          <LDatePicker className="w-full" />
        </Form.Item>,
      ]}
    />
  );
};
