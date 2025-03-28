import { RowCol } from "@common/components/grid/RowCol";
import {
  categoryOptions,
  formOptions,
  sourceOptions,
  typeOptions,
} from "@modules/expense/components/FormExpense/options";
import { Form, Select } from "antd";

export const FormDetailsExpense: React.FC = () => {
  return (
    <RowCol
      items={[
        <Form.Item
          key="details-form"
          label="Forma de Pagamento"
          name={["details", "form"]}
          required
        >
          <Select options={formOptions} allowClear />
        </Form.Item>,
        <Form.Item
          key="details-type"
          label="Tipo de Pagamento"
          name={["details", "type"]}
          required
        >
          <Select options={typeOptions} allowClear />
        </Form.Item>,
        <Form.Item
          key="details-source"
          label="Fonte Pagadora"
          name={["details", "source"]}
          required
        >
          <Select options={sourceOptions} allowClear />
        </Form.Item>,
        <Form.Item
          key="details-category"
          label="Categoria"
          name={["details", "category"]}
          required
        >
          <Select options={categoryOptions} allowClear />
        </Form.Item>,
      ]}
    />
  );
};
