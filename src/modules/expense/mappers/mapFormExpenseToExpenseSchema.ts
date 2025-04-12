import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { DateTime } from "luxon";
import { Types } from "mongoose";
import { formatFormValueToExpenseSchemaValue } from "@modules/expense/utils/formatFormValueToExpenseSchemaValue";
import { FrequencyEnum } from "@common/constants/FrequencyEnum";
import { ExpenseModelSchema } from "@modules/expense/schemas/ExpenseModelSchema";
import { IPaymentAt } from "@modules/expense/models/IPaymentAt";
import { convertToDateTime } from "@common/utils/date";

type PlusDateReturn = {
  days?: number;
  weeks?: number;
  months?: number;
  years?: number;
};

type BuildInstallmentArgs = {
  index: number;
  payment: ExpenseForm["payment"];
  purchasedAt: DateTime;
  shouldPayCurrentMonth: ExpenseForm["shouldPayCurrentMonth"];
  shouldPayNextPeriod: boolean;
  value: number;
};

function mapInstallments(
  value: number,
  purchasedAt: ExpenseForm["purchasedAt"],
  payday: number,
  payment: ExpenseForm["payment"],
  shouldPayCurrentMonth: boolean = true,
): IPaymentAt[] {
  const minMonth: number = DateTime.now()
    .set({ day: 1 })
    .diff(purchasedAt.set({ day: 1 }), "months").months;

  const arraySize: number = payment.isRecurrent
    ? Math.ceil(minMonth + 12)
    : payment.totalInstallments;

  return Array.from(
    { length: arraySize },
    (_, index): IPaymentAt =>
      buildInstallment({
        index,
        payment,
        purchasedAt,
        shouldPayCurrentMonth,
        shouldPayNextPeriod: purchasedAt > DateTime.now().set({ day: payday }),
        value: Number(value),
      }),
  );
}

function buildInstallment(data: BuildInstallmentArgs): IPaymentAt {
  const {
    index,
    payment,
    purchasedAt,
    shouldPayCurrentMonth,
    shouldPayNextPeriod,
    value,
  } = data;

  const { frequency, frequencyPeriod, payday } = payment;

  const interval = getPlusDate(
    frequency,
    frequencyPeriod,
    shouldPayNextPeriod,
    index,
  );

  const date = purchasedAt.plus(interval).endOf("day");

  return {
    date,
    value,
    isPaid: checkIsPaid(date, payment, shouldPayCurrentMonth),
  };
}

function getPlusDate(
  frequency: FrequencyEnum,
  frequencyPeriod: number,
  isNextPeriod: boolean,
  additional: number,
): PlusDateReturn {
  const period = Number(frequencyPeriod) + (isNextPeriod ? 1 : 0);
  switch (frequency) {
    case FrequencyEnum.DAYS:
      return { days: period + additional };
    case FrequencyEnum.WEEKS:
      return { weeks: period + additional };
    case FrequencyEnum.MONTHS:
      return { months: period + additional };
    case FrequencyEnum.YEARS:
      return { years: period + additional };
    default:
      return { months: 1 + additional };
  }
}

function checkIsPaid(
  installmentDate: DateTime,
  payment: ExpenseForm["payment"],
  shouldPayCurrentMonth: ExpenseForm["shouldPayCurrentMonth"],
): boolean {
  const currentMonthPayday = DateTime.now()
    .set({ day: payment.payday })
    .endOf("day");

  const isPaidByDate = installmentDate < currentMonthPayday;
  const isCurrentMonthChecking = installmentDate === currentMonthPayday;

  if (isCurrentMonthChecking) {
    return Boolean(shouldPayCurrentMonth && isPaidByDate);
  }

  return isPaidByDate;
}

export function mapFormExpenseToExpenseSchema(
  data: ExpenseForm,
): ExpenseModelSchema {
  const purchasedAt = convertToDateTime(data.purchasedAt);
  const value = formatFormValueToExpenseSchemaValue(data.value || "0");
  return {
    templateId: data?.templateId || new Types.ObjectId(),
    karteira: data.karteira,
    name: data.name,
    purchasedAt,
    value,
    isFinished: Boolean(data.isFinished),
    valueDefinition: {
      precision: 2,
      currency: "BRL",
    },
    details: {
      form: data.details.form,
      type: data.details.type,
      source: data.details.source,
      category: data.details.category,
    },
    payment: {
      installments: mapInstallments(
        value,
        purchasedAt,
        data.payment.payday,
        data.payment,
      ),
      totalInstallments: data.payment.totalInstallments,
      currentInstallment: data.payment.currentInstallment,
      payday: data.payment.payday,
      frequency: data.payment.frequency,
      frequencyPeriod: data.payment.frequencyPeriod,
      isRecurrent: Boolean(data.payment.isRecurrent),
    },
  };
}
