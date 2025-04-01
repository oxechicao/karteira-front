"use client";

import { ModalFormExpenseTemplate } from "@modules/expenseTemplate/components/ModalFormExpanseTemplate";
import { TableExpenseTemplate } from "@modules/expenseTemplate/features/list/TableExpenseTemplate";
import { ExpenseTemplateDocument } from "@modules/expenseTemplate/expenseTemplate.schema";
import { List, useModalForm, useTable } from "@refinedev/antd";
import { FormProps } from "antd";
import { ExpenseTemplateModelForm } from "@modules/expenseTemplate/expenseTemplate.type";

export const ListExpenseTemplatePage = () => {
  const { tableProps } = useTable<ExpenseTemplateDocument>();

  const {
    modalProps: editModalProps,
    formProps: formEditProps,
    show: openEditModal,
    formLoading: editModalLoading,
  } = useModalForm<ExpenseTemplateModelForm>({
    action: "edit",
    syncWithLocation: true,
  });

  const {
    modalProps: createModalProps,
    formProps: formCreateProps,
    show: openCreateModal,
    formLoading: createModalLoading,
  } = useModalForm<ExpenseTemplateModelForm>({
    action: "create",
    syncWithLocation: true,
  });

  return (
    <>
      <List
        resource="contas"
        title="Template de Contas"
        createButtonProps={{
          children: "Novo Template de Conta",
          onClick: () => {
            openCreateModal();
          },
        }}
      >
        <TableExpenseTemplate
          openEditModal={openEditModal}
          tableProps={tableProps}
        />
      </List>

      {!tableProps.loading && editModalProps && formEditProps && (
        <ModalFormExpenseTemplate
          loading={editModalLoading}
          modalProps={editModalProps}
          formProps={
            formEditProps as unknown as FormProps<ExpenseTemplateModelForm>
          }
        />
      )}

      {!tableProps.loading && createModalProps && formCreateProps && (
        <ModalFormExpenseTemplate
          loading={createModalLoading}
          modalProps={createModalProps}
          formProps={
            formCreateProps as unknown as FormProps<ExpenseTemplateModelForm>
          }
        />
      )}
    </>
  );
};
