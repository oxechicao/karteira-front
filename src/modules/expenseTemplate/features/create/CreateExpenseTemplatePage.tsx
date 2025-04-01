"use client";

import { FormExpenseTemplate } from "@modules/expenseTemplate/components/FormExpenseTemplate";
import { ExpenseTemplateModelForm } from "@modules/expenseTemplate/expenseTemplate.type";
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
