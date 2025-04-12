"use client";

import { FormExpenseTemplate } from "@modules/expense-template/components/FormExpenseTemplate";
import { ExpenseTemplateModelForm } from "@modules/expense-template/models/ExpenseTemplateModelForm";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Spin } from "antd";
import React from "react";
import { mapFormEditExpenseTemplate as mapFormExpenseEditing } from "@modules/expense-template/mappers/mapFormEditExpenseTemplate";

export const EditExpenseTemplatePage: React.FC = () => {
  const {
    formProps: formProps,
    saveButtonProps: saveButtonProps,
    formLoading: formLoading,
  } = useForm<ExpenseTemplateModelForm>();
  return (
    <Edit
      saveButtonProps={{ ...saveButtonProps, children: "Salvar" }}
      title="Editar Conta"
      resource="contas"
    >
      <Spin spinning={formLoading}>
        <Form
          {...formProps}
          initialValues={mapFormExpenseEditing(
            formProps.initialValues as ExpenseTemplateModelForm,
          )}
        >
          <FormExpenseTemplate />
        </Form>
      </Spin>
    </Edit>
  );
};
