import { ExpenseTemplateModelForm } from "@modules/expense-template/models/ExpenseTemplateModelForm";
import { DateTime } from "luxon";

export function mapFormEditExpenseTemplate(
  data: ExpenseTemplateModelForm,
): ExpenseTemplateModelForm {
  return {
    ...data,
    isFinished: Boolean(data?.isFinished),
    purchasedAt: DateTime.fromJSDate(new Date(data?.purchasedAt?.toString())),
    payment: {
      ...data?.payment,
      isRecurrent: !!data?.payment?.isRecurrent,
    },
  };
}
