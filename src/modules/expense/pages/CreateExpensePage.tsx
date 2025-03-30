"use client";

import { FormExpense } from "@modules/expense/components";
import { ExpenseModel } from "@modules/expense/models/ExpenseModel";
import { Create, useForm } from "@refinedev/antd";
import { Form, FormProps } from "antd";

export const CreateExpensePage: React.FC = () => {
  const { formProps: createFormProps } = useForm<ExpenseModel>({
    action: "create",
  });

  return (
    <Create>
      <Form {...createFormProps} layout="vertical">
        <FormExpense />
      </Form>
    </Create>
  );
};
