"use client";

import {
  FormExpense,
  ListExpense,
  SummaryExpense,
} from "@modules/expense/components";
import { Expense } from "@modules/expense/models/Expense";
import { ExpenseModel } from "@modules/expense/models/ExpenseModel";
import { List, useModalForm, useTable } from "@refinedev/antd";
import { Divider, Modal } from "antd";
import type { FormProps } from "antd";

export const ExpensePage: React.FC = () => {
  const { tableProps } = useTable<Expense>();
  // const {
  //   modalProps: createModalProps,
  //   formProps: createFormProps,
  //   show: createModalShow,
  // } = useModalForm<ExpenseModel>({
  //   action: "create",
  // });

  return (
    <>
      <List resource="despesas">
        <SummaryExpense tableProps={tableProps} />
        <Divider />
        <ListExpense tableProps={tableProps} />
      </List>
      {/* <Modal
        width={createModalProps.width}
        title={createModalProps.title}
        open={createModalProps.open}
        onOk={createModalProps.onOk}
        onCancel={createModalProps.onCancel}
        okButtonProps={createModalProps.okButtonProps}
        cancelButtonProps={createModalProps.cancelButtonProps}
        okText="Salvar"
        cancelText="Cancelar"
      >
        {createFormProps?.form && (
          <FormExpense
            createFormProps={
              createFormProps as unknown as FormProps<ExpenseModel>
            }
          />
        )}
      </Modal> */}
    </>
  );
};
