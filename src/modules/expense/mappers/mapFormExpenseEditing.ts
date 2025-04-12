import { ExpenseDocument } from "@modules/expense/schemas/ExpenseModel";
import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { moneyMask } from "@common/utils/doMask";
import { convertToDateTime } from "@common/utils/date";

export function mapFormExpenseEditing(
  data: ExpenseDocument | ExpenseForm,
): ExpenseForm {
  return {
    ...data,
    isFinished: !!data?.isFinished,
    value: moneyMask(String(data.value)),
    purchasedAt: convertToDateTime(data.purchasedAt),
  };
}
