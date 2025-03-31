"use client";

import { FormExpenseTemplate } from "@modules/expenseTemplates/components/FormExpenseTemplate";
import { ExpenseTemplateModelForm } from "@modules/expenseTemplates/expenseTemplate.type";
import { mapFormExpenseTemplateEditing as mapFormExpenseEditing } from "@modules/expenseTemplates/expenseTemplate.mapper";
import { Form, type FormProps, Modal, ModalProps, Spin } from "antd";

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
