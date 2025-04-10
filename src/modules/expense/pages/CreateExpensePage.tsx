"use client";

import FormExpense from "@modules/expense/components/FormExpense";
import { ExpenseModelForm } from "@modules/expense/expense.type";
import { Create, useForm } from "@refinedev/antd";
import { Form } from "antd";

export const CreateExpensePage: React.FC = () => {
  const { formProps: createFormProps, saveButtonProps } =
    useForm<ExpenseModelForm>({
      action: "create",
    });

  return (
    <Create
      saveButtonProps={{ ...saveButtonProps, children: "Salvar" }}
      title="Criar Despesa"
    >
      <Form {...createFormProps} layout="vertical">
        <FormExpense />
      </Form>
    </Create>
  );
};
