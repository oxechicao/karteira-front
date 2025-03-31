import { ExpenseModel } from "@modules/expense/models/ExpenseModelForm";
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

// const [manualPurchasedDate, setManualPurchasedDate] = useState<DateTime>();

// const definitionType = Form.useWatch(
//   ["definition", "type", "name"],
//   createFormProps.form,
// );
// const frequencyType = Form.useWatch(
//   ["definition", "frequency", "name"],
//   createFormProps.form,
// );

// createFormProps.onValuesChange = (changedValues, allValues) => {
//   if (changedValues?.installment?.total !== undefined) {
//     updateLastPaymentAt(
//       createFormProps,
//       changedValues.installment.total,
//       allValues?.timeline?.purchasedAt,
//     );
//   }

//   if (changedValues?.installment?.current !== undefined) {
//     const updated = updatePurchaseAt(
//       createFormProps,
//       changedValues.installment.current,
//       allValues?.timeline?.purchasedAt,
//       manualPurchasedDate,
//     );

//     if (updated && allValues?.installment?.total !== undefined) {
//       updateLastPaymentAt(
//         createFormProps,
//         allValues.installment.total,
//         updated,
//       );
//     }
//   }

//   if (
//     changedValues?.timeline?.purchasedAt ||
//     changedValues?.timeline?.purchasedAt === null
//   ) {
//     setManualPurchasedDate(changedValues.timeline.purchasedAt);
//   }

//   if (changedValues?.flags?.isRecurrent) {
//     createFormProps?.form?.setFieldValue(
//       ["installment", "current"],
//       changedValues.flags.isRecurrent ? 0 : undefined,
//     );
//   }
// };
