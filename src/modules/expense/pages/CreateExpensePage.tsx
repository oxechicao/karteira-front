"use client";

import FormExpense from "@modules/expense/components/FormExpense";
import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { Create, useForm } from "@refinedev/antd";
import { Form } from "antd";

export const CreateExpensePage: React.FC = () => {
  const { formProps: createFormProps, saveButtonProps } = useForm<ExpenseForm>({
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
