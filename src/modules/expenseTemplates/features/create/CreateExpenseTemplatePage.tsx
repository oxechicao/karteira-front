"use client";

import { FormExpenseTemplate } from "@modules/expenseTemplates/features/create/FormExpenseTemplate";
import ExpenseTemplateModelForm from "@modules/expenseTemplates/models/ExpenseTemplateModelForm";
import { Create, useForm } from "@refinedev/antd";
import { Form } from "antd";

export const CreateExpenseTemplatePage = () => {
  const { formProps, saveButtonProps } = useForm<ExpenseTemplateModelForm>();

  return (
    <Create
      title="Criar Tipo de Pagamento"
      resource="tipos"
      saveButtonProps={{ ...saveButtonProps, children: "Salvar" }}
    >
      <Form {...formProps} layout="vertical">
        <FormExpenseTemplate />
      </Form>
    </Create>
  );
};
