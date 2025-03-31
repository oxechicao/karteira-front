"use client";

import { FormExpenseTemplate } from "@modules/expenseTemplates/features/create/FormExpenseTemplate";
import mapDatesEditing from "@modules/expenseTemplates/helpers/mapDatesEditing";
import ExpenseTemplateModelForm from "@modules/expenseTemplates/models/ExpenseTemplateModelForm";
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
          initialValues={mapDatesEditing(
            formProps.initialValues as ExpenseTemplateModelForm,
          )}
        >
          <FormExpenseTemplate />
        </Form>
      </Spin>
    </Edit>
  );
};
