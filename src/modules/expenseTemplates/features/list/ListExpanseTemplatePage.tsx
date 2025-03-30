"use client";

import { ModalFormExpenseTemplate } from "@modules/expenseTemplates/features/edit/ModalFormExpanseTemplate";
import { TableExpenseTemplate } from "@modules/expenseTemplates/features/list/TableExpenseTemplate";
import { ExpenseTemplateModel } from "@modules/expenseTemplates/models/ExpenseTemplateModel";
import {
  ExpenseTemplate,
  ExpenseTemplateDocument,
} from "@modules/expenseTemplates/schemas/ExpenseTemplateSchema";
import { List, useModalForm, useTable } from "@refinedev/antd";
import { FormProps } from "antd";

export const ListExpenseTemplatePage = () => {
  const { tableProps } = useTable<ExpenseTemplate>();

  const {
    modalProps: editModalProps,
    formProps: formEditProps,
    show: openEditModal,
    formLoading: editModalLoading,
  } = useModalForm<ExpenseTemplateModel>({
    action: "edit",
    syncWithLocation: true,
  });

  const {
    modalProps: createModalProps,
    formProps: formCreateProps,
    show: openCreateModal,
    formLoading: createModalLoading,
  } = useModalForm<ExpenseTemplateModel>({
    action: "create",
    syncWithLocation: true,
  });

  return (
    <>
      <List
        resource="modelos"
        title="Modelos de Despesas"
        createButtonProps={{
          children: "Novo Modelo de Despesa",
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
            formEditProps as unknown as FormProps<ExpenseTemplateModel>
          }
        />
      )}

      {!tableProps.loading && createModalProps && formCreateProps && (
        <ModalFormExpenseTemplate
          loading={createModalLoading}
          modalProps={createModalProps}
          formProps={
            formCreateProps as unknown as FormProps<ExpenseTemplateModel>
          }
        />
      )}
    </>
  );
};
