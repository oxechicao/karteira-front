"use client";

import { FormExpenseTemplate } from "@modules/expenseTemplates/components/FormExpenseTemplate";
import { ExpenseTemplateModelForm } from "@modules/expenseTemplates/expenseTemplate.type";
import { mapFormExpenseTemplateEditing as mapFormExpenseEditing } from "@modules/expenseTemplates/expenseTemplate.mapper";
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
      title="Editar Tipo de Despesa"
      resource="tipos"
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
