"use client";

import FormExpense from "@modules/expense/components/FormExpense";
import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { ExpenseDocument } from "@modules/expense/schemas/ExpenseModel";
import { Form, type FormProps, Modal, ModalProps, Spin } from "antd";
import { mapFormExpenseEditing } from "@modules/expense/mappers/mapFormExpenseEditing";

type ModalFormExpenseProps = {
  modalProps: ModalProps;
  formProps: FormProps<ExpenseForm>;
  loading: boolean;
};

export default function ModalFormExpense({
  modalProps,
  formProps,
  loading,
}: ModalFormExpenseProps) {
  return (
    <Modal
      {...modalProps}
      loading={loading}
      okText="Salvar"
      cancelText="Cancelar"
    >
      <Spin spinning={loading}>test</Spin>
    </Modal>
  );
}
