"use client";

import { FormExpenseTemplate } from "@modules/expense-template/components/FormExpenseTemplate";
import { ExpenseTemplateModelForm } from "@modules/expense-template/models/ExpenseTemplateModelForm";
import { Form, type FormProps, Modal, ModalProps, Spin } from "antd";
import { mapFormEditExpenseTemplate as mapFormExpenseEditing } from "@modules/expense-template/mappers/mapFormEditExpenseTemplate";

type ModalFormExpenseTemplateProps = {
  modalProps: ModalProps;
  formProps: FormProps<ExpenseTemplateModelForm>;
  loading: boolean;
};

export const ModalFormExpenseTemplate: React.FC<
  ModalFormExpenseTemplateProps
> = ({ modalProps, formProps, loading }) => {
  const { initialValues } = formProps;

  return (
    <Modal {...modalProps} okText="Salvar" cancelText="Cancelar">
      <Spin spinning={loading}>
        {formProps?.form && (
          <Form
            layout="vertical"
            {...formProps}
            initialValues={mapFormExpenseEditing(
              initialValues as ExpenseTemplateModelForm,
            )}
          >
            <FormExpenseTemplate />
          </Form>
        )}
      </Spin>
    </Modal>
  );
};
