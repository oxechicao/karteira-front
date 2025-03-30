"use client";

import { FormExpenseTemplate } from "@modules/expenseTemplates/features/create/FormExpenseTemplate";
import { ExpenseTemplateModel } from "@modules/expenseTemplates/models/ExpenseTemplateModel";
import { Create, useForm } from "@refinedev/antd";
import { Form } from "antd";

export const CreateExpenseTemplatePage = () => {
  const { formProps, saveButtonProps } = useForm<ExpenseTemplateModel>();

  return (
    <Create
      title="Criar Modelo de Pagamento"
      resource="modelos"
      saveButtonProps={{ ...saveButtonProps, children: "Salvar" }}
    >
      <Form {...formProps} layout="vertical">
        <FormExpenseTemplate />
      </Form>
    </Create>
  );
};
