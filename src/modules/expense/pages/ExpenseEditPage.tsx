"use client";

import { Edit, useForm } from "@refinedev/antd";
import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { Form, Spin } from "antd";
import { FormExpense } from "@modules/expense/components/FormExpense";

import { mapFormExpenseEditing } from "@modules/expense/mappers/mapFormExpenseEditing";

export function ExpenseEditPage() {
  const { formProps, saveButtonProps, formLoading } = useForm<ExpenseForm>({
    action: "edit",
    queryOptions: {
      select: (data) => {
        const { data: values } = data || {};
        return {
          data: mapFormExpenseEditing(values),
        };
      },
    },
  });

  return (
    <Edit
      saveButtonProps={{ ...saveButtonProps, children: "Salvar" }}
      title="Editar Despesa"
    >
      <Spin spinning={formLoading}>
        <Form {...formProps} layout="vertical">
          <FormExpense />
        </Form>
      </Spin>
    </Edit>
  );
}
