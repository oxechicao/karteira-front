"use client";

import ModalFormExpense from "@modules/expense/components/ModalFormExpanse";
import TableExpense from "@modules/expense/features/list/TableExpense";
import { ExpenseModelForm } from "@modules/expense/expense.type";
import { ExpenseDocument } from "@modules/expense/expense.schema";
import { List, useModalForm, useTable } from "@refinedev/antd";
import { FormProps } from "antd";

export default function ListExpensePage() {
  const { tableProps } = useTable<ExpenseDocument>();

  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editOpenModal,
    formLoading: editModalLoading,
  } = useModalForm<ExpenseModelForm>({
    action: "edit",
    syncWithLocation: true,
  });

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createOpenModal,
    formLoading: createModalLoading,
  } = useModalForm<ExpenseModelForm>({
    action: "create",
    syncWithLocation: true,
  });

  return (
    <>
      <List
        resource="despesas"
        title="Lista de Despesas"
        createButtonProps={{
          children: "Novo",
          onClick: () => {
            createOpenModal();
          },
        }}
      >
        <TableExpense tableProps={tableProps} openEditModal={editOpenModal} />
      </List>
      {!tableProps.loading && createModalProps && createFormProps && (
        <ModalFormExpense
          loading={createModalLoading}
          modalProps={createModalProps}
          formProps={createFormProps as unknown as FormProps<ExpenseModelForm>}
        />
      )}
      {!tableProps.loading && editModalProps && editFormProps && (
        <ModalFormExpense
          loading={editModalLoading}
          modalProps={editModalProps}
          formProps={editFormProps as unknown as FormProps<ExpenseModelForm>}
        />
      )}
    </>
  );
}
