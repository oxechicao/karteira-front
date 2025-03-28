"use client";

import { FormExpense } from "@modules/expense/components";
import { ExpenseModel } from "@modules/expense/models/ExpenseModel";
import { Create, useForm } from "@refinedev/antd";
import { FormProps } from "antd";

export const CreateExpensePage: React.FC = () => {
  const { formProps: createFormProps } = useForm<ExpenseModel>({
    action: "create",
  });

  return (
    <Create>
      <FormExpense
        createFormProps={createFormProps as unknown as FormProps<ExpenseModel>}
      />
    </Create>
  );
};
