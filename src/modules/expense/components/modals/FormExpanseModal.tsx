"use client";

import FormExpense from "@modules/expense/components/FormExpense";
import { mapFormExpenseEditing } from "@modules/expense/expense.mapper";
import { ExpenseModelForm } from "@modules/expense/expense.type";
import { ExpenseDocument } from "@modules/expense/expense.schema";
import { Form, type FormProps, Modal, ModalProps, Spin } from "antd";

type ModalFormExpenseProps = {
  modalProps: ModalProps;
  formProps: FormProps<ExpenseModelForm>;
  loading: boolean;
};

export default function ModalFormExpense({
  modalProps,
  formProps,
  loading,
}: ModalFormExpenseProps) {
  const { initialValues } = formProps;

  return (
    <Modal {...modalProps} okText="Salvar" cancelText="Cancelar">
      <Spin spinning={loading}>
        {!loading && formProps?.form && (
          <Form
            {...formProps}
            layout="vertical"
            initialValues={
              initialValues
                ? mapFormExpenseEditing(initialValues as ExpenseDocument)
                : {}
            }
          >
            <FormExpense />
          </Form>
        )}
      </Spin>
    </Modal>
  );
}
