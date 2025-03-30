"use client";

import { FormExpenseTemplate } from "@modules/expenseTemplates/features/create/FormExpenseTemplate";
import mapDatesEditing from "@modules/expenseTemplates/helpers/mapDatesEditing";
import { ExpenseTemplateModel } from "@modules/expenseTemplates/models/ExpenseTemplateModel";
import { Form, type FormProps, Modal, ModalProps, Spin } from "antd";
import { DateTime } from "luxon";

type ModalFormExpenseTemplateProps = {
  modalProps: ModalProps;
  formProps: FormProps<ExpenseTemplateModel>;
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
            initialValues={mapDatesEditing(
              initialValues as ExpenseTemplateModel,
            )}
          >
            <FormExpenseTemplate />
          </Form>
        )}
      </Spin>
    </Modal>
  );
};
