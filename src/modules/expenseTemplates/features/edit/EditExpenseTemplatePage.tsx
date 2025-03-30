"use client";

import { FormExpenseTemplate } from "@modules/expenseTemplates/features/create/FormExpenseTemplate";
import mapDatesEditing from "@modules/expenseTemplates/helpers/mapDatesEditing";
import { ExpenseTemplateModel } from "@modules/expenseTemplates/models/ExpenseTemplateModel";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Spin } from "antd";
import React from "react";

export const EditExpenseTemplatePage: React.FC = () => {
  const {
    formProps: formProps,
    saveButtonProps: saveButtonProps,
    formLoading: formLoading,
  } = useForm<ExpenseTemplateModel>();
  return (
    <Edit
      saveButtonProps={{ ...saveButtonProps, children: "Salvar" }}
      title="Editar Modelo de Despesa"
      resource="modelos"
    >
      <Spin spinning={formLoading}>
        <Form
          {...formProps}
          initialValues={mapDatesEditing(
            formProps.initialValues as ExpenseTemplateModel,
          )}
        >
          <FormExpenseTemplate />
        </Form>
      </Spin>
    </Edit>
  );
};
