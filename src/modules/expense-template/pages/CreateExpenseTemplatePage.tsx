"use client";

import { FormExpenseTemplate } from "@modules/expense-template/components/FormExpenseTemplate";
import { ExpenseTemplateModelForm } from "@modules/expense-template/models/ExpenseTemplateModelForm";
import { Create, useForm } from "@refinedev/antd";
import { Form } from "antd";

export const CreateExpenseTemplatePage = () => {
  const { formProps, saveButtonProps } = useForm<ExpenseTemplateModelForm>();

  return (
    <Create
      title="Criar Tipo de Pagamento"
      resource="contas"
      saveButtonProps={{ ...saveButtonProps, children: "Salvar" }}
    >
      <Form {...formProps} layout="vertical">
        <FormExpenseTemplate />
      </Form>
    </Create>
  );
};
