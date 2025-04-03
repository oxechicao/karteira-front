import {
  ExpenseListTable,
  ExpenseModelForm,
} from "@modules/expense/expense.type";
import { ExpenseDocument } from "@modules/expense/expense.schema";
import { DateTime } from "luxon";

import { FrequencyEnum } from "@common/constants/FrequencyEnum";
import { ExpenseModelSchema } from "@modules/expense/expense.schema";
import {
  ExpenseTemplateForm,
  ExpenseTemplatePaymentAt,
} from "@modules/expenseTemplate/expenseTemplate.type";
import { Types } from "mongoose";

export function mapFormExpenseEditing(data: ExpenseDocument): ExpenseModelForm {
  const purchasedAt = data.purchasedAt
    ? new Date(data.purchasedAt.toString())
    : new Date();

  return {
    ...data,
    isFinished: !!data?.isFinished,
    purchasedAt: DateTime.fromJSDate(purchasedAt),
  };
}

const getPlusDate = (
  frequency: FrequencyEnum,
  frequencyPeriod: number,
  isNextPeriod: boolean,
  additional: number,
) => {
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
};

const mapInstallments = (
  value: ExpenseTemplateForm["value"],
  purchasedAt: ExpenseTemplateForm["purchasedAt"],
  payday: number,
  payment: ExpenseTemplateForm["payment"],
): ExpenseTemplatePaymentAt[] => {
  let arraySize = 0;
  const minMonth = DateTime.now()
    .set({ day: 1 })
    .diff(purchasedAt.set({ day: 1 }), "months").months;

  if (payment.isRecurrent) {
    arraySize = Math.ceil(minMonth + 12);
  } else {
    arraySize = payment.totalInstallments;
  }

  const shouldPayNextPeriod = purchasedAt > DateTime.now().set({ day: payday });

  return Array.from(
    { length: arraySize },
    (_, index): ExpenseTemplatePaymentAt => {
      const interval = getPlusDate(
        payment.frequency,
        payment.frequencyPeriod,
        shouldPayNextPeriod,
        index,
      );

      const date = purchasedAt.plus(interval).set({ day: payday }).endOf("day");

      const isPaid = payment.isRecurrent
        ? date <= DateTime.now().endOf("day")
        : index < payment.currentInstallment;

      return { date, value, isPaid };
    },
  );
};

export function mapExpenseSchema(data: ExpenseModelForm): ExpenseModelSchema {
  console.log(typeof data.purchasedAt);
  const purchasedAt = DateTime.fromJSDate(
    data.purchasedAt ? new Date(data.purchasedAt.toString()) : new Date(),
  );

  const value = Number(String(data.value).replace(/\D/g, ""));
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

export const mapExpenseToList = (
  expenses: ExpenseDocument[],
): ExpenseListTable[] => {
  return expenses.map(
    (expense: ExpenseDocument): ExpenseListTable => ({
      _id: expense._id as string,
      name: expense.name,
      value: expense.value,
      purchasedAt: expense.purchasedAt,
      payment: {
        currentInstallment: expense.payment.currentInstallment,
        totalInstallments: expense.payment.totalInstallments,
      },
      details: {
        category: expense.details.category,
        source: expense.details.source,
        form: expense.details.form,
        type: expense.details.type,
      },
    }),
  );
};
