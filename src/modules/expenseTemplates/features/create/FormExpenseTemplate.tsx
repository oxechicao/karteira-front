import { FormExpense } from "@modules/expense/components/FormExpense/FormExpense";
import ExpenseTemplateModelForm from "@modules/expenseTemplates/models/ExpenseTemplateModelForm";
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
      <FormExpense notRequired />
    </>
  );
};
