import { FrequencyEnum } from "@modules/expense/enums/FrequencyEnum";
import ExpenseModelForm from "@modules/expense/models/ExpenseModelForm";
import { ExpenseModelSchema } from "@modules/expense/schemas/ExpenseSchema";
import ExpenseTemplateForm from "@modules/expenseTemplates/models/ExpenseTemplateForm";
import ExpenseTemplatePaymentAt from "@modules/expenseTemplates/models/ExpenseTemplatePaymentAt";
import { DateTime } from "luxon";

function getPlusDate(
  frequency: FrequencyEnum,
  frequencyPeriod: number,
  isFirstPaymentNextMonth: boolean,
  aditional: number,
) {
  const period = Number(frequencyPeriod) + (isFirstPaymentNextMonth ? 1 : 0);
  switch (frequency) {
    case FrequencyEnum.DAYS:
      return { days: period + aditional };
    case FrequencyEnum.WEEKS:
      return { weeks: period + aditional };
    case FrequencyEnum.MONTHS:
      return { months: period + aditional };
    case FrequencyEnum.YEARS:
      return { years: period + aditional };
    default:
      return { months: 1 + aditional };
  }
}

function mapInstallments(
  value: ExpenseTemplateForm["value"],
  purchasedAt: ExpenseTemplateForm["purchasedAt"],
  payday: number,
  payment: ExpenseTemplateForm["payment"],
): ExpenseTemplatePaymentAt[] {
  let arraySize = 0;
  const minMonth = DateTime.now()
    .set({ day: 1 })
    .diff(
      DateTime.fromISO(purchasedAt.toISO()).set({ day: 1 }),
      "months",
    ).months;

  if (payment.isRecurrent) {
    arraySize = Math.ceil(minMonth + 12);
  } else {
    arraySize = payment.totalInstallments;
  }

  const installments = Array.from({ length: arraySize }, (_, index) => {
    const interval = getPlusDate(
      payment.frequency,
      payment.frequencyPeriod,
      payment.isFirstPaymentNextMonth,
      index,
    );

    const date = purchasedAt.plus(interval).set({ day: payday }).endOf("day");

    const isPaid = payment.isRecurrent
      ? date <= DateTime.now().endOf("day")
      : index < payment.currentInstallment;

    return {
      date: date.toISO(),
      value,
      isPaid,
    };
  });

  return installments;
}

export default function mapExpenseSchema(
  data: ExpenseModelForm,
): ExpenseModelSchema {
  const purchasedAt = DateTime.fromISO(data.purchasedAt);
  const value = Number(String(data.value).replace(/\D/g, ""));
  return {
    ...data,
    value,
    purchasedAt,
    payment: {
      ...data.payment,
      installments: mapInstallments(
        value,
        purchasedAt,
        data.payday,
        data.payment,
      ),
    },
  };
}
