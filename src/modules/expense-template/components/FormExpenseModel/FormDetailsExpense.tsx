import { RowCol } from "@common/components/grid/RowCol";
import { FormExpenseNoRequired } from "@modules/expense-template/components/FormExpenseModel/FormExpenseModel";
import {
  categoryOptions,
  formOptions,
  typeOptions,
} from "@modules/expense/constants/options";
import { Form, Input, Select } from "antd";

export default function FormDetailsExpense({
  notRequired,
}: FormExpenseNoRequired) {
  return (
    <RowCol
      items={[
        <Form.Item
          key="details-form"
          label="Forma de Pagamento"
          name={["details", "form"]}
          required={!notRequired}
        >
          <Select options={formOptions} allowClear />
        </Form.Item>,
        <Form.Item
          key="details-type"
          label="Tipo de Pagamento"
          name={["details", "type"]}
          required={!notRequired}
        >
          <Select options={typeOptions} allowClear />
        </Form.Item>,
        <Form.Item
          key="details-source"
          label="Fonte Pagadora"
          name={["details", "source"]}
          required={!notRequired}
        >
          <Input placeholder="Itaú, Nubank, PagSeguro, Familia, etc." />
        </Form.Item>,
        <Form.Item
          key="details-category"
          label="Categoria"
          name={["details", "category"]}
          required={!notRequired}
        >
          <Select options={categoryOptions} allowClear />
        </Form.Item>,
      ]}
    />
  );
}
