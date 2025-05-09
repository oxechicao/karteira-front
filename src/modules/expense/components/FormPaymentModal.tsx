import { Checkbox, Divider, Form, Modal } from "antd";
import { HttpError, useOne } from "@refinedev/core";
import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { useMemo, useReducer } from "react";
import { beginningCurrentMonth, convertToDateTime } from "@common/utils/date";
import { DateTime } from "luxon";

import { payExpense } from "@modules/expense/services/payExpense";

type ModalPaymentProps = {
  isOpen: boolean;
  handleClose: () => void;
  expenseId: string;
};

export const FormPaymentModal: React.FC<ModalPaymentProps> = (props) => {
  const { isOpen, handleClose, expenseId } = props;
  const { data, isLoading } = useOne<ExpenseForm, HttpError>({
    resource: "despesas",
    id: expenseId,
  });

  const [form] = Form.useForm();
  const checklistOptions = useMemo(() => {
    if (!data?.data) return [];

    return data?.data.payment?.installments
      ?.filter((installment) => !installment.isPaid)
      .map((installment) => ({
        label: convertToDateTime(installment.date).toFormat("dd/MM/yyyy"),
        value: convertToDateTime(installment.date).toFormat("yyyy-MM-dd"),
      }));
  }, [data]);

  const handleOk = async () => {
    console.log("handler ok", form.getFieldsValue());
    const fields = form.getFieldsValue();
    if (!fields.installments) return;

    await payExpense(expenseId, [
      ...fields.installments.current,
      ...(fields.installments.future || []),
    ]);
  };

  const handleAfterClose = () => {
    form.resetFields();
  };

  return (
    <Modal
      loading={isLoading}
      title="Pagamentos"
      open={isOpen}
      okText="Salvar"
      cancelText="Cancelar"
      onCancel={handleClose}
      afterClose={handleAfterClose}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Divider orientation="left">
          Mês atual: {DateTime.now().setLocale("pt-BR").toFormat("LLLL")}
        </Divider>
        <Form.Item
          name={["installments", "current"]}
          label="Parcelas"
          rules={[{ required: true, message: "Selecione as parcelas" }]}
        >
          <Checkbox.Group
            options={checklistOptions?.filter(
              (option) =>
                DateTime.fromFormat(option.value, "yyyy-MM-dd")
                  .startOf("day")
                  .startOf("month") <= beginningCurrentMonth,
            )}
          />
        </Form.Item>
        <Divider orientation="left">Próximos meses</Divider>
        <Form.Item
          name={["installments", "future"]}
          label="Parcelas"
          rules={[{ required: true, message: "Selecione as parcelas" }]}
        >
          <Checkbox.Group
            options={checklistOptions?.filter(
              (option) =>
                DateTime.fromFormat(option.value, "yyyy-MM-dd")
                  .startOf("day")
                  .startOf("month") > beginningCurrentMonth,
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
