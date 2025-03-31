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
} from "@modules/expenseTemplates/expenseTemplate.type";
import { Types } from "mongoose";

export function mapFormExpenseEditing(data: ExpenseDocument): ExpenseModelForm {
  const purchasedAt = data.purchasedAt
    ? new Date(data.purchasedAt.toString())
    : new Date();

  return {
    ...data,
    isFinished: !!data?.isFinished,
    purchasedAt: DateTime.fromJSDate(purchasedAt),
    payment: {
      ...data?.payment,
      isFirstPaymentNextMonth: !!data?.payment?.isFirstPaymentNextMonth,
      isRecurrent: !!data?.payment?.isRecurrent,
    },
  };
}

const getPlusDate = (
  frequency: FrequencyEnum,
  frequencyPeriod: number,
  isFirstPaymentNextMonth: boolean,
  aditional: number,
) => {
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

  const installments = Array.from(
    { length: arraySize },
    (_, index): ExpenseTemplatePaymentAt => {
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

      return { date, value, isPaid };
    },
  );

  return installments;
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
    isFinished: !!data.isFinished,
    payday: data.payday,
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
        data.payday,
        data.payment,
      ),
      totalInstallments: data.payment.totalInstallments,
      currentInstallment: data.payment.currentInstallment,
      frequency: data.payment.frequency,
      frequencyPeriod: data.payment.frequencyPeriod,
      isRecurrent: !!data.payment.isRecurrent,
      isFirstPaymentNextMonth: !!data.payment.isFirstPaymentNextMonth,
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
