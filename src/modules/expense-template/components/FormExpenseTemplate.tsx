import FormExpenseModel from "@modules/expense-template/components/FormExpenseModel/FormExpenseModel";
import { ExpenseTemplateModelForm } from "@modules/expense-template/expenseTemplate.type";
import { Divider, Form, Input } from "antd";
import React from "react";

type FormExpenseModelProps = {
  initialValues?: ExpenseTemplateModelForm;
};

export const FormExpenseTemplate: React.FC<FormExpenseModelProps> = () => {
  return (
    <>
      <Divider orientation="left">Tipo de Pagamento</Divider>
      <Form.Item name="templateName" label="Nome do Tipo de Pagamento" required>
        <Input />
      </Form.Item>
      <FormExpenseModel notRequired />
    </>
  );
};
