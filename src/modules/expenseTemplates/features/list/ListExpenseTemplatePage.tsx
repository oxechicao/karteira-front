"use client";

import { ModalFormExpenseTemplate } from "@modules/expenseTemplates/components/ModalFormExpanseTemplate";
import { TableExpenseTemplate } from "@modules/expenseTemplates/features/list/TableExpenseTemplate";
import { ExpenseTemplateDocument } from "@modules/expenseTemplates/expenseTemplate.schema";
import { List, useModalForm, useTable } from "@refinedev/antd";
import { FormProps } from "antd";
import { ExpenseTemplateModelForm } from "@modules/expenseTemplates/expenseTemplate.type";

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
        resource="tipos"
        title="Tipos de Despesas"
        createButtonProps={{
          children: "Novo Tipo de Despesa",
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
