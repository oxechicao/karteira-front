"use client";

import { expenseModelFabric } from "@modules/expense/mocks/expenseModel.mock";
import { FormExpenseTemplate } from "@modules/expense/components/FormExpenseTemplate/FormExpenseTemplate";
import { ExpenseTemplateModel } from "@modules/expense/models/ExpenseTemplateModel";
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
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          templateName: "Nubank credito",
          ...expenseModelFabric({}),
        }}
      >
        <FormExpenseTemplate />
      </Form>
    </Create>
  );
};
