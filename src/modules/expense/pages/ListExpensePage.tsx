"use client";

import ModalFormExpense from "@modules/expense/components/FormExpanseModal";
import { TableExpense } from "@modules/expense/components/TableExpense";
import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { List, useModalForm, useTable } from "@refinedev/antd";
import { FormProps } from "antd";
import { ExpenseDocument } from "@modules/expense/schemas/ExpenseModel";
import { useState } from "react";
import { FormPaymentModal } from "@modules/expense/components/FormPaymentModal";
import { ExpenseListTable } from "@modules/expense/models/ExpenseListTable";

export function ListExpensePage() {
  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>("");

  const setupPaymentModal = (id: string) => {
    setCurrentId(id);
    setOpenPaymentModal(true);
  };

  const { tableProps } = useTable<ExpenseListTable>({
    syncWithLocation: true,
  });

  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editOpenModal,
    formLoading: editModalLoading,
  } = useModalForm<ExpenseForm>({
    action: "edit",
    syncWithLocation: true,
  });

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createOpenModal,
    formLoading: createModalLoading,
  } = useModalForm<ExpenseForm>({
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
        <TableExpense
          tableProps={tableProps}
          openEditModal={editOpenModal}
          openPaymentModal={setupPaymentModal}
        />
      </List>
      {!tableProps.loading && createModalProps && createFormProps && (
        <ModalFormExpense
          loading={createModalLoading}
          modalProps={createModalProps}
          formProps={createFormProps as unknown as FormProps<ExpenseForm>}
        />
      )}
      <ModalFormExpense
        loading={editModalLoading}
        modalProps={editModalProps}
        formProps={editFormProps as unknown as FormProps<ExpenseForm>}
      />
      <FormPaymentModal
        isOpen={openPaymentModal}
        handleClose={() => {
          setOpenPaymentModal(false);
          setCurrentId("");
        }}
        expenseId={currentId}
      />
    </>
  );
}
