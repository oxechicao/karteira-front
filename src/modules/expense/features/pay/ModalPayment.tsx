import { Checkbox, Divider, Form, Modal } from "antd";
import { ExpenseTemplatePaymentAt } from "@modules/expenseTemplate/expenseTemplate.type";
import { HttpError, useOne } from "@refinedev/core";
import { ExpenseModelForm } from "@modules/expense/expense.type";
import { useMemo, useReducer } from "react";
import { beginningCurrentMonth, getDateTime } from "@common/utils/date";
import { DateTime } from "luxon";
import { payExpense } from "@modules/expense/features/pay/payExpense.service";

type ModalPaymentProps = {
  isOpen: boolean;
  handleClose: () => void;
  expenseId: string;
};

export const ModalPayment: React.FC<ModalPaymentProps> = (props) => {
  const { isOpen, handleClose, expenseId } = props;
  const { data, isLoading } = useOne<ExpenseModelForm, HttpError>({
    resource: "despesas",
    id: expenseId,
  });

  const [form] = Form.useForm();
  const checklistOptions = useMemo(() => {
    if (!data?.data) return [];

    return data?.data.payment?.installments
      ?.filter((installment) => !installment.isPaid)
      .map((installment) => ({
        label: getDateTime(installment.date).toFormat("dd/MM/yyyy"),
        value: getDateTime(installment.date).toFormat("yyyy-MM-dd"),
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
