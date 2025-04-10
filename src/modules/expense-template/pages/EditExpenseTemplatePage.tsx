"use client";

import { FormExpenseTemplate } from "@modules/expense-template/components/FormExpenseTemplate";
import { ExpenseTemplateModelForm } from "@modules/expense-template/expenseTemplate.type";
import { mapFormExpenseTemplateEditing as mapFormExpenseEditing } from "@modules/expense-template/expense-template.mapper";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Spin } from "antd";
import React from "react";

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
