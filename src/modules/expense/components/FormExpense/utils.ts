import { ExpenseModel } from "@modules/expense/models/ExpenseModel";
import type { FormProps } from "antd";
import { DateTime } from "luxon";

export const updateLastPaymentAt = (
  createFormProps: FormProps<ExpenseModel>,
  installmentTotal: number,
  formPurchasedAt?: DateTime,
): boolean => {
  const purchasedAt = formPurchasedAt || DateTime.now();

  createFormProps?.form?.setFieldValue(
    ["timeline", "lastPaymentAt"],
    purchasedAt.plus({
      months: installmentTotal,
    }),
  );
  return true;
};

export const updatePurchaseAt = (
  createFormProps: FormProps<ExpenseModel>,
  currentInstallment: number,
  purchasedAt?: DateTime,
  manualPurchasedDate?: DateTime,
): DateTime | undefined => {
  let newDate: DateTime | undefined = undefined;

  if (currentInstallment === 0 && manualPurchasedDate) {
    newDate = manualPurchasedDate;
  }

  if (currentInstallment > 0 && manualPurchasedDate && purchasedAt) {
    return;
  }

  newDate = DateTime.now().minus({ months: currentInstallment + 1 });

  if (!newDate) return;

  createFormProps.form?.setFieldValue(["timeline", "purchasedAt"], newDate);
  return newDate;
};
