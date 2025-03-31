import ExpenseTemplateModelForm from "@modules/expenseTemplates/models/ExpenseTemplateModelForm";
import { DateTime } from "luxon";

export default function mapDatesEditing(
  data: ExpenseTemplateModelForm,
): ExpenseTemplateModelForm {
  return {
    ...data,
    isFinished: !!data?.isFinished,
    purchasedAt: DateTime.fromJSDate(new Date(data?.purchasedAt)),
    payment: {
      ...data?.payment,
      isFirstPaymentNextMonth: !!data?.payment?.isFirstPaymentNextMonth,
      isRecurrent: !!data?.payment?.isRecurrent,
    },
  };
}
