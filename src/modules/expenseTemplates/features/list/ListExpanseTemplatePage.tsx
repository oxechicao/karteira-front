"use client";

import { ModalFormExpenseTemplate } from "@modules/expenseTemplates/features/list/ModalFormExpanseTemplate";
import { TableExpenseTemplate } from "@modules/expenseTemplates/features/list/TableExpenseTemplate";
import { ExpenseTemplateModel } from "@modules/expenseTemplates/models/ExpenseTemplateModel";
import {
  ExpenseTemplate,
  ExpenseTemplateDocument,
} from "@modules/expenseTemplates/schemas/ExpenseTemplateSchema";
import { List, useModalForm, useTable } from "@refinedev/antd";
import { Button, FormProps, Modal } from "antd";
import { useState } from "react";

export const ListExpenseTemplatePage = () => {
  const [expenseTemplate, setExpenseTemplate] =
    useState<ExpenseTemplateModel>();

  const { tableProps } = useTable<ExpenseTemplate>();

  const {
    modalProps: editModalProps,
    formProps: formEditProps,
    show: openEditModal,
    formLoading: editModalLoading,
  } = useModalForm<ExpenseTemplateDocument>({
    action: "edit",
    syncWithLocation: true,
  });

  return (
    <>
      <List
        resource="modelos"
        title="Modelos de Despesas"
        createButtonProps={{
          children: "Criar Modelo",
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
    </>
  );
};
