import { FormExpense } from "@modules/expense/components/FormExpense/FormExpense";
import { ExpenseTemplateModel } from "@modules/expenseTemplates/models/ExpenseTemplateModel";
import { Divider, Form, Input } from "antd";
import React from "react";

type FormExpenseModelProps = {
  initialValues?: ExpenseTemplateModel;
};

export const FormExpenseTemplate: React.FC<FormExpenseModelProps> = () => {
  return (
    <>
      <Divider orientation="left">Modelo de Pagamento</Divider>
      <Form.Item
        name="templateName"
        label="Nome do Modelo de Pagamento"
        required
      >
        <Input />
      </Form.Item>
      <FormExpense notRequired />
    </>
  );
};
