"use client";

import { FormExpense } from "@modules/expense/components/FormExpense";
import { ListExpense } from "@modules/expense/components/ListExpense";
import { expenseMock } from "@modules/expense/mocks/expensiesMock";
import { ExpenseEntity } from "@modules/expense/models/Expense";
import { List, useModalForm, useTable } from "@refinedev/antd";
import { Modal } from "antd";

export const ExpensePage: React.FC = () => {
  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createModalShow,
  } = useModalForm<ExpenseEntity>({
    action: "create",
  });

  return (
    <>
      <List
        resource="despesas"
        createButtonProps={{
          children: "Nova despesa",
          onClick: () => {
            createModalShow();
          },
        }}
      >
        {/* <ListExpense tableProps={tableProps} /> */}
      </List>
      <Modal {...createModalProps}>
        <FormExpense createFormProps={createFormProps} />
      </Modal>
    </>
  );
};
